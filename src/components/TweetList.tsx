import { useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Empty, Space,Typography } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/web-react/icon';

import { tweetListStore } from '../store/TweetListStore';
import TweetItem from './TweetItem';
import { debounce } from 'lodash';
import './TweetList.css';

const {Text} = Typography

const TweetList = () => {
    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        tweetListStore.loadTweets();
    }, []);
    console.log(tweetListStore.tweets)

    const handleScroll = useCallback(debounce(() => {
        if (!observerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = observerRef.current;
        if (scrollHeight - scrollTop - clientHeight < 20) {
            tweetListStore.loadMoreTweets();
        }
    }, 100), []);

    if (tweetListStore.tweets.length === 0 && !tweetListStore.isLoading) {
        return (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
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
      className="tweet-list"
      style={{ height: '100vh' }}
      onScroll={handleScroll}
    >
        <div className="space-y-2 p-1">
            {tweetListStore.tweets.map(tweet => (
            <TweetItem key={tweet.content} tweet={tweet} />
            ))}
        </div>
        <div style={{ textAlign: 'center', padding: '32px 0',height: '100px' }}>
            {/* 加载中状态 */}
            {tweetListStore.isLoading && (
                <Space size="medium">
                    <IconLoading />
                </Space>
            )}
            {/* 没有更多内容 */}
            {!tweetListStore.isLoading && !tweetListStore.hasMore && tweetListStore.tweets.length > 0 && (
                <div style={{ 
                    color: '#86909C',
                    borderTop: '1px solid #e5e6eb'
                }}>
                    <Text>已经到底啦，没有更多内容了</Text>
                </div>
            )}
        </div>
        
    </div>
  );
};

export default observer(TweetList);
