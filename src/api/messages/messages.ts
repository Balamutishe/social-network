import { validateResponse } from "../validateResponse.ts";

import {
  MessageSchema,
  MessagesResponseDataSchema,
  TMessage,
  TMessagesResponseData,
} from "./types.ts";
import { BASE_URL } from "../base-url.ts";

export async function getAllMessages(
  chatId: string,
  page?: string
): Promise<TMessagesResponseData> {
  return fetch(`${BASE_URL}/messages/${chatId}?page=${page}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((messagesData) => MessagesResponseDataSchema.parse(messagesData));
}

export async function getMessage(id: string): Promise<TMessage> {
  return fetch(`${BASE_URL}/messages/${id}`, {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((message) => MessageSchema.parse(message));
}

export async function createMessage({
  formText,
  chatId,
}: {
  formText: string;
  chatId?: string;
}): Promise<TMessage> {
  return fetch(`${BASE_URL}/messages`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formText,
      chatId,
    }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((newMessage) => MessageSchema.parse(newMessage));
}

export async function updateMessage({
  messageText,
  id,
}: {
  messageText: string;
  id: string;
}): Promise<string> {
  return fetch(`${BASE_URL}/messages/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messageText,
    }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((updateMessageId) => updateMessageId);
}

export async function fetchDeleteMessage(id: string): Promise<string> {
  return fetch(`${BASE_URL}/messages/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((deleteMessageId) => deleteMessageId);
}
