export interface PublicUser {
  profilePictureHash?: string | null;
  name?: string;
  userLanguages?: string[];
  username?: string;
  role?: string;
  private?: never;
}

export interface PrivateUser extends Omit<PublicUser, 'private'> {
  private: {
    email?: string;
    emailVerified: boolean;
    phoneNumber?: string;
    accessFlags?: Partial<Record<string, boolean>> | null;
    tempPassword?: boolean;
    disabled: boolean;
    deviceTokens?: string[];
    subscribedTopics?: string[];
    notificationKey?: string | null;
    interpreterNumber?: string;
    onboardingCompleted?: boolean;
    requisitionOn?: boolean;
    userType?: string[];
  };
}
