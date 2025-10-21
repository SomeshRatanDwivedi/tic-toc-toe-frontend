//This page is used to render all the game played by the login user

import { useEffect, useState } from "react"
import type { GameRecordType } from "../../../types"
import { getUserGamesApi } from "../../../api/game";
import type { AxiosError } from "axios";
import GamesPlayed from "../../../components/GamesPlayed";
import { toast } from "react-toastify";

const Games = () => {
  const [games, setGames] = useState<GameRecordType[]>([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const getUserGames = async () => {
    try {
      setLoading(true);
      const response = await getUserGamesApi(user.id);
      if(response.success) {
        setGames(response.data);
        setLoading(false);
      } else {
        console.error("Failed to fetch user games:", response.message);
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error:unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error("Error fetching user games:", axiosError.response?.data?.message || error);
      toast.error(axiosError.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserGames();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>;
  }
  return <GamesPlayed games={games} />;
}

export default Games