import { validateResponse } from "../validateResponse.ts";

import {
  ChatSchema,
  ChatsListSchema,
  ResponseResultGetOneChatSchema,
  TChat,
  TChatsList,
  TResponseGetOneChat,
} from "./types.ts";
import { BASE_URL } from "../base-url.ts";

export async function getAllChats(): Promise<TChatsList> {
  return fetch(`${BASE_URL}/chats`, {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((chatsList) => ChatsListSchema.parse(chatsList));
}

export async function getOneChat(
  id: string,
  page: string
): Promise<TResponseGetOneChat> {
  return fetch(`${BASE_URL}/chats/${id}/${page}`, {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((chatData) => ResponseResultGetOneChatSchema.parse(chatData));
}

export async function createChat({
  formText,
}: {
  formText: string;
}): Promise<TChat> {
  return fetch(`${BASE_URL}/chats`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formText,
    }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((newChatData: string) => ChatSchema.parse(newChatData));
}

export async function updateChat(
  chatText: string,
  id: string
): Promise<string> {
  return fetch(`${BASE_URL}/chats/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatText,
    }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((updateChatId) => updateChatId);
}

export async function fetchDeleteChat(id: string): Promise<string> {
  return fetch(`${BASE_URL}/chats/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((deleteChatId) => deleteChatId);
}
