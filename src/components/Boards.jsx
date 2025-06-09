import React, { useState } from 'react';
import BoardDetailModal from './BoardDetailModal';
import BoardConfirmModal from './BoardConfirmModal';
import BoardEditModal from './BoardEditModal';
import useBoardStore from '../stores/store';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

const typeToKorean = (type) => {
  switch (type) {
    case 'todo':
      return '할 일';
    case 'inprogress':
      return '진행 중';
    case 'done':
      return '완료';
    default:
      return type;
  }
};

const Boards = ({ type }) => {
  const data = useBoardStore((state) => state.board);
  const filteredData = data.filter((item) => item.type === type);
  const [item, setItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { setNodeRef, isOver } = useDroppable({
    id: type,
    data: {
      type,
      accepts: ['todo', 'inprogress', 'done'],
    },
  });

  // Detail Modal
  const handleModalOpen = (item) => {
    setItem(item);
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setItem(null);
    setIsOpen(false);
  };

  // Delete Confirm Modal
  const handleConfirmModalOpen = (id) => {
    setSelectedId(id);
    handleModalClose();
    setConfirmIsOpen(true);
  };
  const handleConfirmModalClose = () => {
    setConfirmIsOpen(false);
    setSelectedId(null);
  };

  // Edit Modal
  const handleEditModalOpen = () => {
    setEditIsOpen(true);
    setIsOpen(false);
  };
  const handleEditModalClose = () => {
    setEditIsOpen(false);
  };

  return (
    <div
      ref={setNodeRef}
      className={`w-full flex flex-col ${isOver ? 'bg-slate-200 rounded-md ring-2 ring-slate-400 ring-inset' : ''}`}
    >
      <div className="w-full h-[60px] bg-stone-200 rounded-sm flex items-center justify-center">
        <p className="text-lg font-semibold">{typeToKorean(type)}</p>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <SortableContext items={filteredData} strategy={verticalListSortingStrategy}>
          {filteredData.map((item) => (
            <SortableItem key={item.id} id={item.id} item={item} onClick={() => handleModalOpen(item)} />
          ))}
        </SortableContext>
      </div>
      {isOpen && (
        <BoardDetailModal
          onClose={handleModalClose}
          onConfirm={handleConfirmModalOpen}
          onEdit={handleEditModalOpen}
          item={item}
        />
      )}
      {confirmIsOpen && <BoardConfirmModal onClose={handleConfirmModalClose} id={selectedId} />}
      {editIsOpen && <BoardEditModal onClose={handleEditModalClose} item={item} />}
    </div>
  );
};

const SortableItem = ({ id, item, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const itemStyle = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={itemStyle}
      {...attributes}
      {...listeners}
      onClick={onClick}
      key={id}
      className="bg-white hover:bg-stone-100 shadow-md rounded-md p-4 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        {item.type === 'todo' && <div className="animate-pulse w-2 h-2 rounded-full bg-green-500"></div>}
        {item.type === 'inprogress' && <div className="animate-pulse w-2 h-2 rounded-full bg-amber-500"></div>}
        {item.type === 'done' && <div className="animate-pulse w-2 h-2 rounded-full bg-red-500"></div>}
      </div>
      <p className="text-sm text-gray-500">{item.created_at}</p>
    </div>
  );
};

export default Boards;
