import { makeAutoObservable } from "mobx";

export interface TweetItem {
    id: string;
    /** 消息内容 */
    content: string;
    /** 点赞数 */
    likes: number;
    /** 是否点赞 */
    isLiked: boolean;
    timestamp: Date;
    avatar: string;
}

export class TweetItemStore {
    id: string;
    content: string;
    likes: number;
    isLiked: boolean;
    timestamp: Date;
    avatar: string;

    constructor(tweet: TweetItem) {
        const { id, content, likes, isLiked, timestamp, avatar } = tweet
        this.id = id;
        this.content = content;
        this.likes = likes;
        this.isLiked = isLiked;
        this.timestamp = timestamp;
        this.avatar = avatar
    
        makeAutoObservable(this);
    }
    
    toggleLike = () => {
        this.isLiked = !this.isLiked;
        this.likes = this.isLiked ? this.likes + 1 : this.likes - 1;
    };
}
