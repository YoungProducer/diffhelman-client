export interface InviteAcceptedData {
  message: string;
  keys: {
    p: number;
    a: number;
  };
  roomId: string;
}

export interface AcceptInviteKeyResData {
  key: number;
}
