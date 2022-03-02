export type G_NewsEntry<Timestamp> = {
  title: string;
  notificationSent: boolean;
  publishedAt: Timestamp | null;
  published: boolean;
  text: string;
  imagePath?: string | null;
  tags?: Array<string>;
};
