import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useBoardStore = create(
  persist(
    (set) => ({
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
    }),
    {
      name: 'board-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBoardStore;
