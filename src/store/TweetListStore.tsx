import { makeAutoObservable } from "mobx";
import { getTweets, publishTweet } from "../mock";
import { TweetItemStore } from "./TweetItemStore";

class TweetListStore {
    tweets: TweetItemStore[] = [];
    isLoading: boolean = false;
    hasMore: boolean = true;
    page: number = 1;
    itemsPerPage: number = 25;
    constructor() {
        makeAutoObservable(this);
    }
    getInitialTweets = async () => {
        this.isLoading = true;
        const res = await getTweets({page: this.page, count: this.itemsPerPage});
        this.page++;
        this.isLoading = false;
        return res.map(tweet => new TweetItemStore(tweet));
    }
    loadTweets = async () => {
        this.tweets = await this.getInitialTweets();
    }
    loadMoreTweets = async () => {
        if (this.isLoading || !this.hasMore) return;
        this.isLoading = true;
        const res = await getTweets({page: this.page, count: this.itemsPerPage});
        this.page++;
        const newTweets: TweetItemStore[] = res.map(tweet => new TweetItemStore(tweet));
        this.tweets = [...this.tweets, ...newTweets];
        this.isLoading = false;
    }

    publishTweet = async (content: string) => {
        if (!content.trim()) return;
        const res = await publishTweet({ userId: 'userX', content });
        if (!res || res.code !== 0) return res;
        const newTweet = new TweetItemStore(res.data);
        this.tweets = [newTweet, ...this.tweets];
        return res;
    }
    
}

export const tweetListStore = new TweetListStore();
