import React, { useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Empty, Space,Typography } from '@arco-design/web-react';
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
  
    const handleScroll = useCallback(debounce(() => {
        if (!observerRef.current) return;
    
        const { scrollTop, scrollHeight, clientHeight } = observerRef.current;
    
        if (scrollHeight - scrollTop - clientHeight < 20) {
            tweetListStore.loadMoreTweets();
        }
    }, 100), []);

    useEffect(() => {
        const currentRef = observerRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
            return () => {
                currentRef.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

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
      style={{ maxHeight: 'calc(100vh - 200px)' }}
    >
      <div className="space-y-2 p-1">
        {tweetListStore.tweets.map(tweet => (
          <TweetItem key={tweet.content} tweet={tweet} />
        ))}
      </div>
      
        {/* 加载中状态 */}
        {tweetListStore.isLoading && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <Space size="medium">
                <Text>加载更多推文...</Text>
            </Space>
            </div>
        )}
      
        {/* 没有更多内容 */}
        {!tweetListStore.isLoading && !tweetListStore.hasMore && tweetListStore.tweets.length > 0 && (
            <div style={{ 
                textAlign: 'center', 
                padding: '24px 0', 
                color: '#86909C',
                borderTop: '1px solid #e5e6eb'
            }}>
                <Text>已经到底啦，没有更多内容了</Text>
            </div>
        )}
    </div>
  );
};

export default observer(TweetList);
