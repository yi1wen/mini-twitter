import { makeAutoObservable } from "mobx";
import { tweetListStore } from "./TweetListStore";

export class InputStore {
    /** 输入框内容 */
    content: string = '';
    /** 输入框最大字符数 */
    maxChars: number = 280;
    /** 输入框textarea行数 */
    textareaRows: number = 3;
    /** 输入框是否可见 */
    visible: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    setInputContent = (value: string) => {
        if (value.length > this.maxChars) return;
        this.content = value;
        // 动态调整textarea行数: 输入框内容包含换行符时, 行数增加; 否则保持不变
        this.textareaRows = Math.max(value.split('\n').length + 1, this.textareaRows, 3);
    };

    /** 重置输入框状态 */
    clearInputState = () => {
        this.visible = false;
        this.content = '';
        this.textareaRows = 3;

    };

    /** 发布推文 */
    publishTweet = async ({
        successCallback,
        errorCallback,
    }: {
        successCallback?: () => void;
        errorCallback?: (error: unknown) => void;
    }) => {
        if (!this.content.trim()) return;
            const res = await tweetListStore.publishTweet(this.content);
            if (!res || res.code !== 0) {
                errorCallback?.(res?.message || '发布失败');
                return
            };
            this.clearInputState();
            successCallback?.();
    };

    toggleInputVisible = () => {
        this.visible = !this.visible;
    }
}

// 创建输入框存储实例
export const inputStore = new InputStore();
