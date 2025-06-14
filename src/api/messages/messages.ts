import { validateResponse } from "../validateResponse.ts";

import {
  MessageSchema,
  MessagesResponseDataSchema,
  TMessage,
  TMessagesResponseData,
} from "./types.ts";

export async function getAllMessages(
  chatId: string,
  page?: string
): Promise<TMessagesResponseData> {
  return fetch(
    `http://www.24social-network.ru/messages/${chatId}?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(validateResponse)
    .then((response) => response.json())
    .then((messagesData) => MessagesResponseDataSchema.parse(messagesData));
}

export async function getMessage(id: string): Promise<TMessage> {
  return fetch(`http://www.24social-network.ru/messages/${id}`, {
    method: "GET",
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
  return fetch("http://www.24social-network.ru/messages", {
    method: "POST",
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
  return fetch(`http://www.24social-network.ru/messages/${id}`, {
    method: "PATCH",
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
  return fetch(`http://www.24social-network.ru/messages/${id}`, {
    method: "DELETE",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((deleteMessageId) => deleteMessageId);
}
