import { create } from 'zustand';

const useBoardStore = create((set) => ({
  board: [],
  addBoard: (newBoard) => set((state) => ({ board: [...state.board, newBoard] })),
}));

export default useBoardStore;
