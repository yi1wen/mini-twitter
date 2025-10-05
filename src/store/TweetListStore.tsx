import { makeAutoObservable } from "mobx";
import { TweetStore } from "./TweetStore";

class TweetListStore {
    tweets: TweetStore[] = [];
    isLoading: boolean = false;
    hasMore: boolean = true;
    page: number = 1;
    itemsPerPage: number = 25;
    constructor() {
        makeAutoObservable(this);
    }
    getInitialTweets = () => {
        const initialTweets:TweetStore[]=[]
        for (let i = 1; i <= 25; i++) {
            initialTweets.push(new TweetStore({
                id: `initial-${i}`,
                content: `这是第${i}条推文`,
                likes: Math.floor(Math.random() * 100),
                isLiked: false,
                avatar:'用户'+i,
                timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)),
            }));
        }
        return initialTweets
    }
    loadTweets = () => {
        this.tweets = this.getInitialTweets();
    }
    loadMoreTweets = async () => {
        if (this.isLoading || !this.hasMore) return;
        this.isLoading = true;
        await new Promise(resolve => setTimeout(resolve, 1000))
        const newTweets: TweetStore[] = [];
        for (let i = 1; i <= 10; i++) {
            newTweets.push(new TweetStore({
                id: Math.random().toString(36).substring(2),
                content: `这是第${i}条推文,用来测试无限滚动,当前位置是第${this.itemsPerPage}页`,
                likes: Math.floor(Math.random() * 100),
                isLiked: false,
                avatar:'用户'+(this.tweets.length+i),
                timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)),
            }));
        }
        this.tweets = [...this.tweets, ...newTweets];
        this.isLoading = false;
    }
    publishTweet = (content: string) => {
        if (!content.trim()) return;
    
        const newTweet: TweetStore = new TweetStore({
            id: `new-${Date.now()}`,
            content,
            likes: 0,
            isLiked: false,
            timestamp: new Date(),
            avatar:'用户X'
        });
        this.tweets = [newTweet, ...this.tweets];
    }
    
}

export const tweetListStore = new TweetListStore();