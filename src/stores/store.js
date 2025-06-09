import { create } from 'zustand';

const useBoardStore = create((set) => ({
  board: [],
  addBoard: (newBoard) => set((state) => ({ board: [...state.board, newBoard] })),
  removeBoard: (id) => set((state) => ({ board: state.board.filter((b) => b.id !== id) })),
}));

export default useBoardStore;
