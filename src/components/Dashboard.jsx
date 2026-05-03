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
        clearImages,
        setImages,
        timerMode,
        timerDuration,
        setTimerMode,
        setTimerDuration,
        setIsActive,
    } = useSessionStore()

    const fileInputRef = useRef(null)
    const [loadedCount, setLoadedCount] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')

    const handleFolderPick = async () => {
        clearImages()
        setLoadedCount(0)
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
        }
    }

    const handleFileInputChange = (event) => {
        clearImages()
        setLoadedCount(0)
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
        <div className="w-full h-screen flex flex-col items-center justify-center p-12">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl  font-bold mb-2">
                    draft-interval
                </h1>
                <p className="text-xs  tracking-wide">/minimal-sketching-study-tool</p>
            </div>

            {/* Main Card */}
            <div className="max-w-md w-full space-y-4">
                {/* Image Loading Section */}
                <div className="space-y-4">
                    {isFileSystemAccessAPISupported() ? (
                        <button
                            onClick={handleFolderPick}
                            className="w-full flex rounded-lg items-center justify-center gap-3 border border-black  px-6 py-3 hover:bg-[#e5e5e5] transition-colors disabled:opacity-50  font-light"
                        >
                            <Folder size={20} />
                            Select Folder
                        </button>
                    ) : (
                        <div className="text-xs font-light mb-2">
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
                        className="w-full flex rounded-lg items-center justify-center gap-3 border border-black px-6 py-3 hover:bg-[#e5e5e5] transition-colors disabled:opacity-50  font-light"
                    >
                        <Upload size={20} />
                        Select Files
                    </button>

                    {!errorMsg && loadedCount > 0 && (
                        <div className="p-3 text-center">
                            <p className=" text-sm  font-light">
                                ✓ {loadedCount} image{loadedCount !== 1 ? 's' : ''} loaded
                            </p>
                        </div>
                    )}

                    {errorMsg && (
                        <div className="p-3 text-center rounded-lg">
                            <p className="text-sm">{errorMsg}</p>
                        </div>
                    )}
                </div>

                {/* Timer Settings */}
                <div className="space-y-4 pt-4 border-t border-black">
                    {/* Mode Selection */}
                    <div className="space-y-2">
                        <label className="text-sm ">Mode</label>
                        <div className="relative">
                            <select
                                value={timerMode}
                                onChange={(e) => setTimerMode(e.target.value)}
                                className="w-full appearance-none rounded-lg px-6 py-4 text-sm border border-black focus:outline-none focus:border-[#333333] bg-white hover:bg-[#e5e5e5] transition-colors"                        >
                                <option value="fixed">Fixed Interval</option>
                                <option value="class">Class Mode</option>
                                <option value="memory">Memory Flash</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Duration Setting (for Fixed mode) */}
                    {timerMode === 'fixed' && (
                        <div>
                            <label className="text-sm ">
                                Duration (seconds)
                            </label>
                            <input
                                type="range"
                                min="5"
                                max="450"
                                step="5"
                                value={timerDuration}
                                onChange={(e) => setTimerDuration(parseInt(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-sm  font-light">
                                {timerDuration}s
                            </div>
                        </div>
                    )}

                    {timerMode === 'class' && (
                        <div>
                            <p className="text-xs pb-12 font-light">
                                Class Mode: 10×30s, 5×2m, 2×5m, 1×20m
                            </p>
                        </div>
                    )}

                    {timerMode === 'memory' && (
                        <div>
                            <p className="text-xs pb-12 font-light">
                                Image shows for 5-15 seconds, then you draw from memory
                            </p>
                        </div>
                    )}
                </div>

                {/* Start Button */}
                <button
                    onClick={handleStart}
                    disabled={loadedCount === 0}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-b from-[#34C759] to-[#00D084] text-white px-6 py-4 rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
                >
                    <Play size={20} />
                    Start Session
                </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-12 space-y-2">
                <div>
                    <a
                        href="https://ghadj.github.io"
                        target="_blank"
                        className="text-xs hover:underline"
                    >
                        © 2026 georgios hadjiantonis
                    </a>
                </div>
                <div>
                    <a
                        href="https://github.com/ghadj/draft-interval"
                        target="_blank"
                        className="text-xs hover:underline"
                    >
                        github
                    </a>
                </div>
            </div>
        </div>
    )
}
