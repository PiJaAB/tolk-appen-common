export type G_ChatInfo<Timestamp> = {
  users: string[];
  created: Timestamp;
} & (
  | {
      isGroupchat: false;
      name?: never;
    }
  | {
      isGroupchat: true;
      name?: string;
    }
);

interface BaseSystemMessage<Timestamp, Type extends string> {
  isSystem: true;
  created: Timestamp;
  type: Type;
}

export interface G_StatusMessageUserAction<UserRef, Timestamp>
  extends BaseSystemMessage<Timestamp, 'userAction'> {
  action: 'leave' | 'join';
  user: UserRef;
}

export type G_ChatUserMesage<UserRef, MessageRef, Timestamp> = {
  isSystem?: false;
  author: UserRef;
  content: string;
  created: Timestamp;
  // embeds?: unknown[];
  responseTo?: MessageRef;
};

export type G_ChatSystemMessage<UserRef, Timestamp> = G_StatusMessageUserAction<
  UserRef,
  Timestamp
>;

export type G_ChatMessage<UserRef, MessageRef, Timestamp> =
  | G_ChatUserMesage<UserRef, MessageRef, Timestamp>
  | G_ChatSystemMessage<Timestamp, UserRef>;
