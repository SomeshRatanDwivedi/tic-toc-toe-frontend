//This page is used to render all the game played by the login user

import { useEffect, useState } from "react"
import type { GameRecordType } from "../../../types"
import { getUserGamesApi } from "../../../api/game";
import type { AxiosError } from "axios";
import GamesPlayed from "../../../components/GamesPlayed";

const Games = () => {
  const [games, setGames] = useState<GameRecordType[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const getUserGames = async () => {
    try {
      const response = await getUserGamesApi(user.id);
      console.log("User games response:", response);
      if(response.success) {
        setGames(response.data);
      } else {
        console.error("Failed to fetch user games:", response.message);
      }
    } catch (error:unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error("Error fetching user games:", axiosError.response?.data?.message || error);
    }
  };
  useEffect(() => {
    getUserGames();
  }, []);

  return <GamesPlayed games={games} />;
}

export default Games