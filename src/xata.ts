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
    ],
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
    revLinks: [{ column: "user", table: "posts" }],
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

export type DatabaseSchema = {
  folders: FoldersRecord;
  posts: PostsRecord;
  users: UsersRecord;
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
