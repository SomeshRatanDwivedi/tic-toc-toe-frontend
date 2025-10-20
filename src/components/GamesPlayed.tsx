import type { GameRecordType } from "../types";


export default function GamesPlayed({ games }: { games: GameRecordType[] }) {
  const user= JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="p-6 text-gray-900">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
        🎮 Games Played by Me
      </h1>

      {games.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No games played yet 😔</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => {
            const formattedDate = new Date(game.createdAt).toLocaleString();
            const isWinner = game.status === "finished" && game.winner?.username;

            return (
              <div
                key={game.id}
                className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-indigo-700">
                    Game #{game.id}
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${game.status === "finished"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {game.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold text-gray-700">🕹 Player X:</span>{" "}
                    {game.playerX.id===user.id ? <span className="text-blue-600 font-semibold">{game.playerX.username} (You)</span> : game.playerX.username}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">⭕ Player O:</span>{" "}
                    {game.playerO.id===user.id ? <span className="text-blue-600 font-semibold">{game.playerO.username} (You)</span> : game.playerO.username}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">🏆 Winner:</span>{" "}
                    {isWinner ? (
                      <span className="text-green-600 font-semibold">
                        {game.winner.id===user.id?' You':game.winner.username}
                      </span>
                    ) : (
                      "—"
                    )}
                  </p>
                  <p className="text-gray-500 text-xs">
                    📅 Played on: {formattedDate}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
