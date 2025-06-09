import { DndContext, DragOverlay, PointerSensor, rectIntersection, useSensor, useSensors } from '@dnd-kit/core';
import Boards from './components/Boards';
import Controller from './components/Controller';
import useBoardStore from './stores/store';
import { useState } from 'react';

//1. zustand로 상태 관리 라이브러리를 변경해야 합니다.
//2. Recoil과 관련된 데이터를 삭제하고, RecoilRoot를 제거하세요.

function App() {
  const { board, updateBoardType, reorderItems } = useBoardStore();
  const [activeId, setActiveId] = useState(null);
  const activeItem = activeId ? board.find((item) => item.id === activeId) : null;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    console.log('drag start');
  };

  const handleDragEnd = (event) => {
    console.log('drag end');
  };

  const handleDragOver = (event) => {
    console.log('drag over');
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex flex-col h-screen">
        <header className="w-full h-[80px] bg-slate-800 flex flex-col items-center justify-center text-stone-100">
          <p className="text-lg font-semibold">Kanban Board Project</p>
          <p>Chapter 2. Zustand</p>
        </header>
        <main className="flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-4 p-4 w-full">
            <Boards type={'todo'} />
            <Boards type={'inprogress'} />
            <Boards type={'done'} />
          </div>
          <Controller />
        </main>
        <footer className="w-full h-[60px] bg-slate-800 flex items-center text-stone-100 justify-center">
          <p>&copy; OZ-CodingSchool</p>
        </footer>
      </div>
      <DragOverlay>
        {activeId && activeItem && (
          <div className="bg-white shadow-xl rounded-md p-4 w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{activeItem.title}</h3>
              {activeItem.type === 'todo' && <div className="animate-pulse w-2 h-2 rounded-full bg-green-500"></div>}
              {activeItem.type === 'inprogress' && (
                <div className="animate-pulse w-2 h-2 rounded-full bg-amber-500"></div>
              )}
              {activeItem.type === 'done' && <div className="animate-pulse w-2 h-2 rounded-full bg-red-500"></div>}
            </div>
            <p className="text-sm text-gray-500">{activeItem.created_at}</p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
