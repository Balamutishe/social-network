import { z } from "zod";

export const PostSchema = z.object({
	_id: z.string(),
	postText: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
	userId: z.string(),
	userImg: z.string(),
	likeCount: z.number(),
})

export type TPost = z.infer<typeof PostSchema>;

export const PostsListSchema = z.array(PostSchema)

export type TPostsList = z.infer<typeof PostsListSchema>;