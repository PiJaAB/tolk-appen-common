export interface PublicUser {
  interpreterNumber?: string;
  name?: string;
  userLanguages?: string[];
  userType?: string[];
  username?: string;
  role?: string;
}

export interface PrivateUser extends PublicUser {
  private: {
    email?: string;
    emailVerified: boolean;
    phoneNumber?: string;
    accessFlags?: Partial<Record<string, boolean>> | null;
    tempPassword?: boolean;
    disabled: boolean;
  };
}

export type Category = {
  name: string;
  description: string;
  weight: number;
};

export type Categories = {
  [key: string]: Category;
};

export interface G_Post<Timestamp, PublicUserRef> {
  author: PublicUserRef;
  created: Timestamp;
  modified: Timestamp | null;
  lastContent: Timestamp;
  category: string;
  title: string;
  text: string;
  imageUrl?: string;
  commentCount: number;
  replyCount: number;
  likes: number;
}

export interface G_Comment<Timestamp, PublicUserRef> {
  created: Timestamp;
  modified: Timestamp | null;
  lastContent: Timestamp;
  text: string;
  author: PublicUserRef;
  replyCount: number;
  likes: number;
}

export interface G_Reply<Timestamp, PublicUserRef, ReplyRef> {
  created: Timestamp;
  modified: Timestamp | null;
  text: string;
  author: PublicUserRef;
  respondingTo?: ReplyRef | null;
  likes: number;
}
