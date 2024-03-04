export interface SavedPost {
  id: string;
  post: {
    id: string;
  };
  user: {
    externalId: string;
    id: string;
    xata: {
      createdAt: string;
      updatedAt: string;
      version: number;
    };
  };
  xata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
}

export interface PostUser {
  externalId: string;
  firstname: string;
  id: string;
  imageurl: string;
  lastname: string;
  xata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
}
