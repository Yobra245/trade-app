import create from 'zustand'

type Signal = { data?: any[]; side?: string }

interface SignalState {
  lastSignal: Signal
  setSignal: (s: Signal) => void
}

const useSignals = create<SignalState>((set) => ({
  lastSignal: {},
  setSignal: (s) => set({ lastSignal: s }),
}))

export default useSignals
