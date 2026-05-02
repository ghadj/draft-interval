/**
 * File Loader: Handles File System Access API with fallback to standard input
 * Recursively finds .jpg, .png, and .webp files
 */

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp']

/**
 * Check if browser supports File System Access API
 */
export const isFileSystemAccessAPISupported = () => {
  return window.showDirectoryPicker !== undefined
}

/**
 * Recursively scan directory for image files
 */
async function scanDirectoryRecursive(dirHandle, images = []) {
  try {
    for await (const [name, handle] of dirHandle.entries()) {
      if (handle.kind === 'file') {
        const ext = name.slice(name.lastIndexOf('.')).toLowerCase()
        if (SUPPORTED_FORMATS.includes(ext)) {
          const file = await handle.getFile()
          const url = URL.createObjectURL(file)
          images.push({
            name,
            url,
            file,
          })
        }
      } else if (handle.kind === 'directory') {
        // Recursively scan subdirectories
        await scanDirectoryRecursive(handle, images)
      }
    }
  } catch (error) {
    console.error('Error scanning directory:', error)
  }
  return images
}

/**
 * Load images using File System Access API
 */
export async function loadImagesWithFileSystemAPI() {
  try {
    const dirHandle = await window.showDirectoryPicker()
    let images = await scanDirectoryRecursive(dirHandle)
    
    // Shuffle images
    images = shuffleArray(images)
    
    return images
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('User cancelled directory selection')
    } else {
      console.error('Error loading images:', error)
    }
    return []
  }
}

/**
 * Load images using standard file input (fallback)
 */
export function loadImagesWithFileInput(files) {
  const images = Array.from(files)
    .filter((file) => {
      const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
      return SUPPORTED_FORMATS.includes(ext)
    })
    .map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }))

  return shuffleArray(images)
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Cleanup blob URLs to prevent memory leaks
 */
export function cleanupImageURLs(images) {
  images.forEach((img) => {
    if (img.url) {
      URL.revokeObjectURL(img.url)
    }
  })
}
