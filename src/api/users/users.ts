import { validateResponse } from "../validateResponse.ts";
import {
  TUser,
  TUsersResponseData,
  UserSchema,
  UsersResponseDataSchema,
} from "./types.ts";
import { BASE_URL } from "../base-url.ts";

export function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<TUser> {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((user) => UserSchema.parse(user));
}

export function logout(): Promise<void> {
  return fetch(`${BASE_URL}/logout`, {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then(() => undefined);
}

export function getUserMe(): Promise<TUser> {
  return fetch(`${BASE_URL}`, {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((user) => UserSchema.parse(user));
}

export function getAllUsers(page: number): Promise<TUsersResponseData> {
  return fetch(`${BASE_URL}/users?page=${page}`, {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((usersResponseData) =>
      UsersResponseDataSchema.parse(usersResponseData)
    );
}

export function userRegister({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<void> {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then(() => undefined);
}

export function updateUser(updateUserData: Partial<TUser>): Promise<TUser> {
  return fetch(`${BASE_URL}/users`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateUserData),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((user) => UserSchema.parse(user));
}

export function deleteUser(): Promise<void> {
  return fetch(`${BASE_URL}/users`, {
    method: "DELETE",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then(() => undefined);
}
