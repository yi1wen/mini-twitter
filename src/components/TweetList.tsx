import React, { useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { debounce } from 'lodash';
import './TweetList.css';
// import { tweetStore } from '../stores/TweetStore';
import TweetItem from './TweetItem';
const tweetStore = {
  tweets: [
  {
    content: '这是一条推文',
    avatar: '用户A',
  },
  {
    content: '这是另一条推文',
    avatar: '用户B',
  },  
],
}
const TweetList = () => {
  const observerRef = useRef<HTMLDivElement>(null);
  
  // 初始化
  useEffect(() => {
    // tweetStore.loadInitialTweets();
  }, []);
  
  const handleScroll = useCallback(debounce(() => {
    if (!observerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = observerRef.current;
    
    if (scrollHeight - scrollTop - clientHeight < 200) {
    //   tweetStore.loadMoreTweets();
    }
  }, 100), []);
  
  // 设置滚动监听
  useEffect(() => {
    const currentRef = observerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => {
        currentRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <div 
      ref={observerRef}
      className="tweet-list"
      style={{ maxHeight: 'calc(100vh - 200px)' }}
    >
      <div className="space-y-2 p-1">
        {tweetStore.tweets.map(tweet => (
          <TweetItem key={tweet.content} tweet={tweet} />
        ))}
      </div>
      
      {/* 加载中状态 */}
      {/* {tweetStore.isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">加载更多推文...</span>
        </div>
      )} */}
      
      {/* 没有更多内容 */}
      {/* {!tweetStore.isLoading && !tweetStore.hasMore && tweetStore.tweets.length > 0 && (
        <div className="text-center py-6 text-gray-500 border-t border-gray-200">
          已经到底啦，没有更多内容了
        </div>
      )} */}
      
      {/* 空状态 */}
      {/* {!tweetStore.isLoading && tweetStore.tweets.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          还没有推文，发布你的第一条推文吧！
        </div>
      )} */}
    </div>
  );
};

export default observer(TweetList);
