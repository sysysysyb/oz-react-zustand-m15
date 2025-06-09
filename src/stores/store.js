import { create } from 'zustand';

const useBoardStore = create((set) => ({
  board: [],
  addBoard: (newBoard) => set((state) => ({ board: [...state.board, newBoard] })),
  removeBoard: (id) => set((state) => ({ board: state.board.filter((b) => b.id !== id) })),
  updateBoard: (item) =>
    set((state) => ({
      board: state.board.map((b) => {
        if (b.id === item.id) {
          return item;
        } else {
          return b;
        }
      }),
    })),
}));

export default useBoardStore;
