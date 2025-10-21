interface BoardProps {
  board: (string | null)[];
  onMove: (index: number) => void;
  winningLine?: number[]; // indexes of winning cells
}
const winningLineStyles: Record<string, React.CSSProperties> = {
  "0,1,2": { top: "50px", left: "0px", width: "100%", height: "4px" }, // top row
  "3,4,5": { top: "150px", left: "0px", width: "100%", height: "4px" }, // middle row
  "6,7,8": { top: "250px", left: "0px", width: "100%", height: "4px" }, // bottom row
  "0,3,6": { top: "2px", left: "47px", width: "4px", height: "100%" }, // left column
  "1,4,7": { top: "2px", left: "148px", width: "4px", height: "100%" }, // middle column
  "2,5,8": { top: "2px", left: "252px", width: "4px", height: "100%" }, // right column
  "0,4,8": { top: "0px", left: "0px", width: "430px", height: "4px", transform: "rotate(45deg) translate(14%, 151px)" }, // diagonal TL-BR
  "2,4,6": { top: "0px", left: "2px", width: "430px", height: "4px", transform: "rotate(-45deg) translate(-36%, 61px)" }, // diagonal TR-BL
};

const Board: React.FC<BoardProps> = ({ board, onMove, winningLine }) => {
  return (
    <div className="relative w-[300px] h-[300px] grid grid-cols-3 gap-2 mx-auto">
      {board.map((cell, i) => (
        <div
          key={i}
          onClick={() => !cell && onMove(i)}
          className="w-24 h-24 flex items-center justify-center text-4xl border border-gray-700 cursor-pointer hover:bg-gray-200 text-black font-bold"
        >
          {cell}
        </div>
      ))}

      {/* Winning line */}
      {winningLine && (
        <div
          className="absolute bg-red-500 rounded-full"
          style={winningLineStyles[winningLine.toString()]}
        />
      )}
    </div>
  );
};
export default Board;