import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import socket from 'socket';
import { $room } from 'store/room';
import { getRandomInt } from 'utils/getRandomInt';
import { power } from 'utils/power';

export interface Keys {
  p?: number;
  a?: number;
}

export interface SendPublicKeyFxPayload {
  roomId: string;
  key: number;
}

export const changedKeys = createEvent<Keys>();
export const $sharedKeys = createStore<Keys>({ p: undefined, a: undefined }).on(
  changedKeys,
  (_, keys) => keys
);

export const generatePrivateKey = createEvent<void>();
export const changedPrivateKey = createEvent<number | null>();
export const $privateKey = createStore<number | null>(null).on(
  changedPrivateKey,
  (_, key) => key
);

export const generatePublicKey = createEvent<void>();
export const changedPublicKey = createEvent<number | null>();
export const $publicKey = createStore<number | null>(null).on(
  changedPublicKey,
  (_, key) => key
);

/** Accepts the oposite user public key */
export const generateCommonKey = createEvent<number>();
export const changedCommonKey = createEvent<number | null>();
export const $commonKey = createStore<number | null>(null).on(
  changedCommonKey,
  (_, key) => key
);

export const $keys = combine({
  privateKey: $privateKey,
  publicKey: $publicKey,
});

export const sendPublicKeyFx = createEffect(
  async (data: SendPublicKeyFxPayload | undefined) => {
    console.log({ data });

    if (!data) return;

    socket.sendPublicKey(data.roomId, data.key);
  }
);

sample({
  clock: changedKeys,
  target: generatePrivateKey,
});

sample({
  clock: generatePrivateKey,
  source: $sharedKeys,
  fn: ({ p, a }) => {
    if (!p || !a) return null;

    const key = getRandomInt(1, p - 1);

    return key;
  },
  target: changedPrivateKey,
});

sample({
  clock: changedPrivateKey,
  source: $sharedKeys,
  fn: ({ a, p }, key) => {
    if (!key || !a || !p) return null;

    const publicKey = power(a, key, p);

    return publicKey;
  },
  target: changedPublicKey,
});

sample({
  clock: generateCommonKey,
  source: combine({
    privateKey: $privateKey,
    sharedKeys: $sharedKeys,
  }),
  fn: ({ privateKey, sharedKeys }, publicKey) => {
    if (!privateKey || !sharedKeys.p) return null;

    const key = power(publicKey, privateKey, sharedKeys.p);

    return key;
  },
  target: changedCommonKey,
});

sample({
  clock: combine({
    roomId: $room,
    key: $publicKey,
  }),
  fn: ({ key, roomId }) => {
    if (!roomId || !key) return null;

    return { roomId, key: key };
  },
  target: sendPublicKeyFx,
});

$commonKey.watch((k) => console.log('Common key is: ', k));
