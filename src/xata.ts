// Generated by Xata Codegen 0.29.2. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "folders",
    columns: [
      { name: "name", type: "string", unique: true },
      { name: "userId", type: "string", notNull: true, defaultValue: "null" },
    ],
  },
  {
    name: "posts",
    columns: [
      {
        name: "title",
        type: "string",
        notNull: true,
        defaultValue: "frontend post",
      },
      {
        name: "content",
        type: "string",
        notNull: true,
        defaultValue: "frontend content",
      },
      { name: "user", type: "link", link: { table: "users" } },
      { name: "language", type: "string" },
      {
        name: "image",
        type: "file[]",
        "file[]": { defaultPublicAccess: true },
      },
      { name: "likesCount", type: "int", notNull: true, defaultValue: "0" },
      { name: "tag", type: "string" },
    ],
    revLinks: [{ column: "post", table: "users_saved_posts" }],
  },
  {
    name: "users",
    columns: [
      {
        name: "firstname",
        type: "string",
        notNull: true,
        defaultValue: "null",
      },
      { name: "lastname", type: "string", notNull: true, defaultValue: "null" },
      { name: "externalId", type: "string", unique: true },
      { name: "imageurl", type: "string" },
    ],
    revLinks: [
      { column: "user", table: "posts" },
      { column: "user", table: "users_saved_posts" },
      { column: "follower", table: "followers" },
      { column: "user", table: "followers" },
      { column: "user", table: "followings" },
      { column: "following", table: "followings" },
    ],
  },
  {
    name: "users_saved_posts",
    columns: [
      { name: "user", type: "link", link: { table: "users" } },
      { name: "post", type: "link", link: { table: "posts" } },
    ],
  },
  {
    name: "followers",
    columns: [
      { name: "follower", type: "link", link: { table: "users" } },
      { name: "user", type: "link", link: { table: "users" } },
    ],
  },
  {
    name: "followings",
    columns: [
      { name: "user", type: "link", link: { table: "users" } },
      { name: "following", type: "link", link: { table: "users" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Folders = InferredTypes["folders"];
export type FoldersRecord = Folders & XataRecord;

export type Posts = InferredTypes["posts"];
export type PostsRecord = Posts & XataRecord;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type UsersSavedPosts = InferredTypes["users_saved_posts"];
export type UsersSavedPostsRecord = UsersSavedPosts & XataRecord;

export type Followers = InferredTypes["followers"];
export type FollowersRecord = Followers & XataRecord;

export type Followings = InferredTypes["followings"];
export type FollowingsRecord = Followings & XataRecord;

export type DatabaseSchema = {
  folders: FoldersRecord;
  posts: PostsRecord;
  users: UsersRecord;
  users_saved_posts: UsersSavedPostsRecord;
  followers: FollowersRecord;
  followings: FollowingsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://zkan-T-ridi-s-workspace-kmehi2.us-east-1.xata.sh/db/auth-db",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
