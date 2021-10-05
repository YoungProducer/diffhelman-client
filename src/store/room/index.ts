import { createEvent, createStore } from 'effector';

export const changedRoomId = createEvent<string | null>();
export const $room = createStore<string | null>(null).on(
  changedRoomId,
  (_, id) => id
);
