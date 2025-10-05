import { useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Empty, Space,Typography } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/web-react/icon';
import { tweetListStore } from '../store/TweetListStore';
import TweetItem from './TweetItem';
import { debounce } from 'lodash';
import './TweetList.css';

const { Text } = Typography

const TweetList = () => {
    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        tweetListStore.loadTweets();
    }, []);

    const handleScroll = useCallback(
        debounce(() => {
            if (!observerRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = observerRef.current;
            if (scrollHeight - scrollTop - clientHeight < 20) {
                tweetListStore.loadMoreTweets();
            }
        }, 100)
    , []);

    if (tweetListStore.tweets.length === 0 && !tweetListStore.isLoading) {
        return (
            <div className='message-list-empty'>
                <Empty 
                    description={
                        <Text>还没有推文，发布你的第一条推文吧！</Text>
                    }
                />
            </div>
        );
    }

  return (
    <div 
        ref={observerRef}
        className="message-list"
        onScroll={handleScroll}
    >
        <div>
            {tweetListStore.tweets.map(tweet => (
                <TweetItem key={tweet.id} tweet={tweet} />
            ))}
        </div>
        <div className="message-list-end">
            {/* 加载中状态 */}
            {tweetListStore.isLoading && (
                <Space size="medium">
                    <IconLoading />
                </Space>
            )}
            {/* 没有更多内容 */}
            {!tweetListStore.isLoading && !tweetListStore.hasMore && tweetListStore.tweets.length > 0 && (
                <div className="message-list-no-more">
                    <Text>已经到底啦，没有更多内容了</Text>
                </div>
            )}
        </div>
        
    </div>
  );
};

export default observer(TweetList);
