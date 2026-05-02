import React, { useRef, useState } from 'react'
import { Upload, Folder, Play } from 'lucide-react'
import { useSessionStore } from '../store/useSessionStore'
import {
  isFileSystemAccessAPISupported,
  loadImagesWithFileSystemAPI,
  loadImagesWithFileInput,
} from '../lib/fileLoader'

export default function Dashboard() {
  const {
    setImages,
    timerMode,
    timerDuration,
    setTimerMode,
    setTimerDuration,
    setIsActive,
  } = useSessionStore()

  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')

  const handleFolderPick = async () => {
    setIsLoading(true)
    setErrorMsg('')
    try {
      const images = await loadImagesWithFileSystemAPI()
      if (images.length === 0) {
        setErrorMsg('No image files found in the selected folder.')
      } else {
        setImages(images)
        setLoadedCount(images.length)
      }
    } catch (error) {
      setErrorMsg(`Error loading images: ${error.message}`)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileInputChange = (event) => {
    setIsLoading(true)
    setErrorMsg('')
    try {
      const files = event.target.files
      const images = loadImagesWithFileInput(files)
      if (images.length === 0) {
        setErrorMsg('No image files found.')
      } else {
        setImages(images)
        setLoadedCount(images.length)
      }
    } catch (error) {
      setErrorMsg(`Error loading images: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStart = () => {
    if (loadedCount === 0) {
      setErrorMsg('Please load images first.')
      return
    }
    setIsActive(true)
  }

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-mono font-bold text-white mb-2">
          draft-interval
        </h1>
        <p className="text-gray-500 text-sm">minimal gesture study tool</p>
      </div>

      {/* Main Card */}
      <div className="bg-gray-900 rounded-lg p-12 max-w-md w-full space-y-8">
        {/* Image Loading Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-mono text-white">Load Images</h2>

          {isFileSystemAccessAPISupported() ? (
            <button
              onClick={handleFolderPick}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 font-mono"
            >
              <Folder size={20} />
              {isLoading ? 'Loading...' : 'Select Folder'}
            </button>
          ) : (
            <div className="text-sm text-gray-400 mb-2">
              File System API not supported. Use file input below.
            </div>
          )}

          {/* Fallback File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 font-mono"
          >
            <Upload size={20} />
            {isLoading ? 'Loading...' : 'Select Files'}
          </button>

          {loadedCount > 0 && (
            <div className="bg-gray-800 rounded p-3 text-center">
              <p className="text-green-400 text-sm font-mono">
                ✓ {loadedCount} image{loadedCount !== 1 ? 's' : ''} loaded
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-900 bg-opacity-30 rounded p-3 border border-red-700">
              <p className="text-red-300 text-sm">{errorMsg}</p>
            </div>
          )}
        </div>

        {/* Timer Settings */}
        <div className="space-y-4 border-t border-gray-700 pt-6">
          <h2 className="text-lg font-mono text-white">Timer Settings</h2>

          {/* Mode Selection */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-mono">Mode</label>
            <select
              value={timerMode}
              onChange={(e) => setTimerMode(e.target.value)}
              className="w-full bg-gray-800 text-white rounded px-4 py-2 font-mono text-sm border border-gray-700 focus:outline-none focus:border-white"
            >
              <option value="fixed">Fixed Interval</option>
              <option value="class">Class Mode</option>
              <option value="memory">Memory Flash</option>
            </select>
          </div>

          {/* Duration Setting (for Fixed mode) */}
          {timerMode === 'fixed' && (
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-mono">
                Duration (seconds)
              </label>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={timerDuration}
                onChange={(e) => setTimerDuration(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-white font-mono">
                {timerDuration}s
              </div>
            </div>
          )}

          {timerMode === 'class' && (
            <div className="bg-gray-800 rounded p-3">
              <p className="text-xs text-gray-400 font-mono">
                Class Mode: 10×30s, 5×2m, 2×5m, 1×20m
              </p>
            </div>
          )}

          {timerMode === 'memory' && (
            <div className="bg-gray-800 rounded p-3">
              <p className="text-xs text-gray-400 font-mono">
                Image shows for 5s, then you draw from memory
              </p>
            </div>
          )}
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={loadedCount === 0}
          className="w-full flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono font-bold text-lg"
        >
          <Play size={24} />
          Start Session
        </button>
      </div>
    </div>
  )
}
