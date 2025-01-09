import { create } from 'zustand';

interface CurrentProjectStore {
  currentProjectId: string | null;
  currentProjectName: string | null;
  setCurrentProject: (id: string, name: string) => void;
  clearCurrentProject: () => void;
}

export const useCurrentProjectStore = create<CurrentProjectStore>((set) => ({
  currentProjectId: null,
  currentProjectName: null,
  setCurrentProject: (id, name) => set({ currentProjectId: id, currentProjectName: name }),
  clearCurrentProject: () => set({ currentProjectId: null, currentProjectName: null }),
}));

