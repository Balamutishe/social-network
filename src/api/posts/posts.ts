import { validateResponse } from "../validateResponse.ts";

import { PostSchema, PostsListSchema, TPost, TPostsList } from "./types.ts";
import { BASE_URL } from "../base-url.ts";

export async function getAllPosts(): Promise<TPostsList> {
  return fetch(`${BASE_URL}/posts`, {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((postsList) => PostsListSchema.parse(postsList));
}

export async function getPost(id: string): Promise<TPost> {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((post) => PostSchema.parse(post));
}

export async function createPost({
  formText,
}: {
  formText: string;
}): Promise<TPost> {
  return fetch(`${BASE_URL}/posts`, {
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
    .then((post) => PostSchema.parse(post));
}

export async function updatePost({
  postText,
  id,
}: {
  postText: string;
  id: string;
}): Promise<string> {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postText,
    }),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((postId) => postId);
}

export async function fetchDeletePost(id: string): Promise<string> {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((postId) => postId);
}
