import { create } from 'zustand'

type Store = {
  updatedInputValue: string;
  isUpdatingTask: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<Store>((set) => ({
  updatedInputValue: '',
  isUpdatingTask: false,
  isModalOpen: false,
  setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}))
