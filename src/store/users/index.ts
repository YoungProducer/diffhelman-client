import { createStore, createEvent, sample } from 'effector';

interface User {
  username: string;
  socketId: string;
}

export const changedCurrentUsername = createEvent<string>();
export const $currentUserName = createStore<string>('').on(
  changedCurrentUsername,
  (_, name) => name
);

export const changedUserConnected = createEvent<boolean>();
export const $userConnected = createStore<boolean>(false).on(
  changedUserConnected,
  (_, conn) => conn
);

export const changedCurrentUsersList = createEvent<User[]>();
export const setCurrentUsersList = createEvent<User[]>();
export const $onlineUsersList = createStore<User[]>([]).on(
  changedCurrentUsersList,
  (_, users) => users
);

sample({
  clock: setCurrentUsersList,
  source: $currentUserName,
  fn: (currentUserName, usersList) =>
    usersList.filter((user) => user.username !== currentUserName),
  target: changedCurrentUsersList,
});
