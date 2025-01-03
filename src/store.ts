import { create } from 'zustand'

type Store = {
  filterParams: string;
  setFilterParams: (filteredParams: string) => void;
}

export const useTodoListFilterStore = create<Store>()((set) => ({
  filterParams: '',
  setFilterParams: (filterParams: string) => set({ filterParams }),
}))
