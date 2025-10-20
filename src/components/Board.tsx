import React from "react";

interface BoardProps {
  board: (string | null)[];
  onMove: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onMove }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-[300px] mx-auto">
      {board.map((cell, i) => (
        <div
          key={i}
          onClick={() => !cell && onMove(i)}
          className="w-24 h-24 flex items-center justify-center text-4xl border border-gray-700 cursor-pointer hover:bg-gray-200 text-black font-bold"
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default Board;
