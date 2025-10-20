import type { GameType } from "../../types";
import { gameApiInstance } from "../instance";

export const updateGameState = async (gameId: string, gameData: GameType) => {
  const response = await gameApiInstance.put(`games/${gameId}`, gameData);
  return response.data;
}

export const getUserGamesApi = async (userId: string) => {
  const response = await gameApiInstance.get(`games/user/${userId}`);
  return response.data;
}