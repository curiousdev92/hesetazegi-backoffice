import { StateCreator } from "zustand";

interface FishSlice {
  fishes: number;
  addFish: () => void;
}

const createFishSlice: StateCreator<FishSlice, [], [], FishSlice> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});

export default createFishSlice;
