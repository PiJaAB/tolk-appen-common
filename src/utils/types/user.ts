export interface PublicUser {
  interpreterNumber?: string;
  profilePictureHash?: string | null;
  name?: string;
  userLanguages?: string[];
  userType?: string[];
  username?: string;
  role?: string;
  private?: never;
  onboardingCompleted?: boolean;
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
  };
}
