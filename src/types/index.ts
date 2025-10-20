export type UserFormValueType= {
  username: string;
  password: string;
}

export type UserType= {
  id: string;
  username: string;
}

export type PlayersType=UserType & {
  socketId: string;
}

export type GameType= {
  id?: string;
  board?: (string | null)[];
  current?: "X" | "O";
  players?: { X: PlayersType; O: PlayersType };
  status?: "playing" | "finished";
  winnerId?: number | null;
}

export type GameRecordType= {
  id: number;
  status: string;
  createdAt: string;
  winner: UserType;
  playerX: UserType;
  playerO: UserType;
}
