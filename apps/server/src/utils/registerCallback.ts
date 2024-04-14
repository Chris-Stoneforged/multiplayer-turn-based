import { Client, Room } from '@colyseus/core';

export type NextCallback = () => void;
export type MessageCallback = (
  client: Client,
  data: any,
  next: NextCallback
) => void;

export function RegisterCallback(
  room: Room<any>,
  messageType: string | number,
  ...args: MessageCallback[]
) {
  let callbackCount = 0;

  const runCallbacks = (client: Client, data: any) => {
    if (callbackCount >= args.length) {
      return;
    }

    args[callbackCount](client, data, () => {
      callbackCount++;
      runCallbacks(client, data);
    });
  };

  room.onMessage(messageType, runCallbacks);
}
