import { createEvent, createStore } from 'effector';

export interface Invite {
  roomId: string;
  /** Inviter's username */
  username: string;
}

export const addedInvite = createEvent<Invite>();
export const shiftInvite = createEvent();
export const $invites = createStore<Invite[]>([])
  .on(addedInvite, (state, invite) => [...state, invite])
  .on(shiftInvite, (state) => {
    const newState = [...state];
    const res = newState.slice(1);
    console.log(res);
    return res;
  });
