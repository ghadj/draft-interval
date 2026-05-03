import { create } from 'zustand'

export const useSessionStore = create((set, get) => ({
    // Image Management
    images: [],
    currentImageIndex: 0,
    clearImages: () => set({ images: [], currentImageIndex: 0 }),
    setImages: (images) => set({ images, currentImageIndex: 0 }),

    nextImage: () => {
        const state = get()
        const nextIndex = (state.currentImageIndex + 1) % state.images.length
        set({ currentImageIndex: nextIndex })
    },

    previousImage: () => {
        const state = get()
        const prevIndex = state.currentImageIndex === 0
            ? state.images.length - 1
            : state.currentImageIndex - 1
        set({ currentImageIndex: prevIndex })
    },

    skipImage: () => {
        get().nextImage()
    },

    getCurrentImage: () => {
        const state = get()
        return state.images[state.currentImageIndex] || null
    },

    // Timer Management
    timerMode: 'fixed', // 'fixed' | 'class' | 'memory'
    timerDuration: 30, // seconds
    classSequence: [30, 30, 30, 30, 120, 120, 300, 1200], // preset sequence
    isActive: false,
    isPaused: false,
    timeLeft: 0,
    endTime: null,

    setTimerMode: (mode) => set({ timerMode: mode }),
    setTimerDuration: (duration) => set({ timerDuration: duration }),
    setIsActive: (active) => set({ isActive: active }),
    setIsPaused: (paused) => set({ isPaused: paused }),
    setTimeLeft: (time) => set({ timeLeft: time }),
    setEndTime: (time) => set({ endTime: time }),

    // Filter Settings
    filters: {
        grayscale: false,
        flip: false,
        blur: false,
        highContrast: false,
    },

    toggleFilter: (filterName) => {
        set((state) => ({
            filters: {
                ...state.filters,
                [filterName]: !state.filters[filterName],
            },
        }))
    },

    // Overlay Settings
    showRuleOfThirds: false,
    showLineOfAction: false,
    toggleRuleOfThirds: () => set((state) => ({
        showRuleOfThirds: !state.showRuleOfThirds,
    })),
    toggleLineOfAction: () => set((state) => ({
        showLineOfAction: !state.showLineOfAction,
    })),

    // Session History
    sessions: [],
    addSession: (session) => {
        set((state) => ({
            sessions: [...state.sessions, { ...session, id: Date.now() }],
        }))
    },
}))
