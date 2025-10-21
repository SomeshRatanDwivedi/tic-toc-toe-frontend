import React, {useEffect, useState } from "react";
import { socket } from "../../socket";
import Board from "../../components/Board";
import WaitingForMatch from "../../components/OpponentWaiting";
import type { PlayersType, GameType } from "../../types";
import { toast } from "react-toastify";
import { updateGameState } from "../../api/game";
import type { AxiosError } from "axios";


interface Game {
  board: (string | null)[];
  current: "X" | "O";
  players: { X: PlayersType; O: PlayersType };
  status: "playing" | "finished";
  winner?: "X" | "O" | null;
  winningLine?: number[];
}

const GamePage: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [opponent, setOpponent] = useState<{ username: string; id: string, symbol:"X" | "Y" } | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");


  useEffect(() => {
    socket.on("match_found", ({ gameId, opponent }: { gameId: string; opponent: { username: string; id: string, symbol: "X" | "Y" } }) => {
      setGameId(gameId);
      setOpponent(opponent);
      setWaitingForOpponent(false);
    });

    socket.on("game_update", (g: Game) => {
      setGame({ ...g });
    });

    socket.on("matchmaking_canceled", () => {
      setWaitingForOpponent(false);
    });

    return () => {
      socket.off("match_found");
      socket.off("game_update");
      socket.off("matchmaking_canceled");
    };
  }, []);

  const findMatch = () => {
    setWaitingForOpponent(true);
    socket.emit("find_match", user);
  };
  const cancelMatchmaking = () => {
    setWaitingForOpponent(false);
    socket.emit("cancel_matchmaking");
  };

  const handleMove = (index: number) => {
    if (!game || game.status !== "playing") return;
    if (game.players[game.current].socketId === socket.id) {
      socket.emit("make_move", { gameId, index });
    } else {
      toast.info("It's not your turn yet.");
    }
  };

  const handleGameFinish = async () => {
    try {
      // Update game state in the backend
      const gameData: GameType = {
        board: game?.board ?? [],
        winnerId:
          game?.winner === "X"
            ? +game?.players.X.id
            : game?.winner === "O"
            ? +game?.players.O.id
            : null,
        status: "finished" as const,
      };
      const res = await updateGameState(gameId!, gameData);
      if(res.success){
        toast.success("Game result updated successfully.");
      } else {
        toast.error("Failed to update game result: " + res.message);
      }
    } catch (error:unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Failed to update game result.");
    }
  }

  useEffect(() => {
    if (game && game.status === "finished") {
      handleGameFinish();
    }
  }, [game?.status]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100">
      <h1 className="md:text-4xl font-bold text-blue-600 text-lg">Multiplayer Tic-Tac-Toe</h1>
      {waitingForOpponent && <WaitingForMatch />}
      <div className="flex">
        {!game && <button type="button" disabled={waitingForOpponent} onClick={findMatch} className="mt-8 px-6 py-2 mr-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition disabled:opacity-50 disabled:!cursor-not-allowed">Find Match</button>}
        {waitingForOpponent && !game && <button
          className="mt-8 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
          onClick={cancelMatchmaking}
        >
          Cancel
        </button>
        }
      </div>
      {game && (
        <>
          <p className="my-4 text-red-800 text-2xl font-bold">Your opponent: {opponent?.username}</p>

          <p className="my-4 text-red-800 text-2xl font-bold">Symbol: {opponent?.symbol === "X" ? "O" : "X"}</p>

          <Board board={game.board} onMove={handleMove} winningLine={game.winningLine}/>
          {game.status === "finished" && (
            <>
            <h2 className={"mt-4 text-2xl font-bold " + (game.winner !== opponent?.symbol ? "text-green-600" : "text-red-600")}>
              {game.winner
                ? game.winner !== opponent?.symbol
                  ? "You Win 🎉"
                  : "You Lose 😔"
                : "Draw 🤝"}
              </h2>
              <button
                className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
                onClick={() => {
                  setGame(null);
                  setOpponent(null);
                  setGameId(null);
                  findMatch();
                }}
              >
                Play Again
              </button>
              </>
          )}
        </>
      )}
    </div>
  );
};

export default GamePage;
