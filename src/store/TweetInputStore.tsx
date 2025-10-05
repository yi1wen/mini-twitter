import { makeAutoObservable } from "mobx";
import { tweetListStore } from "./TweetListStore";

export class TweetInputStore {
    content: string = '';
    maxChars: number = 280;
    textareaRows = 3;
    visible: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    setContent = (value: string) => {
        if (value.length <= this.maxChars) {
            this.content = value;
        }
        this.textareaRows = Math.max(value.split('\n').length + 1, this.textareaRows, 3);
    };

    clearContent = () => {
        this.content = '';
    };

    get remainingChars() {
        return this.maxChars - this.content.length;
    }

    publishTweet = () => {
        if (this.content.trim()) {
            tweetListStore.publishTweet(this.content);
            this.clearContent();
            this.visible = false;
        }
    };

    toggleVisible = () => {
        this.visible = !this.visible;
    
    }
}

// 创建输入框存储实例
export const inputStore = new TweetInputStore();