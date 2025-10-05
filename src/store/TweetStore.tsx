import { makeAutoObservable } from "mobx";
export interface Post{
    id: string;
    content: string;
    likes: number;
    isLiked: boolean;
    timestamp: Date;
    avatar: string;
}
export class TweetStore {
    id: string;
    content: string;
    likes: number;
    isLiked: boolean;
    timestamp: Date;
    avatar: string;

    constructor(post:Post) {
        const {id,content,likes,isLiked,timestamp,avatar} = post
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
