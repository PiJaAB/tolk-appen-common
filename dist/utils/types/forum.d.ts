export declare type Category = {
    name: string;
    description: string;
    weight: number;
    currentIcon?: string;
    iconColor?: string;
    iconBgColor?: string;
};
export declare type Categories = Record<string, Category>;
export interface G_Post<Timestamp, PublicUserRef> {
    author: PublicUserRef | null;
    created: Timestamp;
    modified: Timestamp | null;
    lastContent: Timestamp;
    category: string | null;
    title: string;
    text: string;
    imageUrl?: string;
    commentCount: number;
    replyCount: number;
    likes: number;
    removed?: boolean;
}
export interface G_Comment<Timestamp, PublicUserRef> {
    created: Timestamp;
    modified: Timestamp | null;
    lastContent: Timestamp;
    text: string;
    author: PublicUserRef | null;
    replyCount: number;
    likes: number;
    removed?: boolean;
}
export interface G_Reply<Timestamp, PublicUserRef, ReplyRef> {
    created: Timestamp;
    modified: Timestamp | null;
    text: string;
    author: PublicUserRef | null;
    respondingTo?: ReplyRef | null;
    likes: number;
    removed?: boolean;
}
