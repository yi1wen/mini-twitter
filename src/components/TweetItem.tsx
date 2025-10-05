import { observer } from 'mobx-react-lite';
import React from 'react';
import { Avatar, Button } from '@arco-design/web-react';
import { IconHeart, IconMessage, IconEye, IconHeartFill } from '@arco-design/web-react/icon';
import './TweetItem.css';
import { TweetStore } from '../store/TweetStore';

interface TweetItemProps {
  tweet: TweetStore
}

const TweetItem = (
    { tweet }: TweetItemProps
) => {
  const {toggleLike} = tweet
  return (
    <div className="tweet-item">
      <div className="item-content">
        <Avatar>{tweet.avatar}</Avatar>
        <div className="item-text">{tweet.content}</div>
      </div>
      <div className="item-actions">
        <Button type="text" shape="circle" icon={tweet.isLiked?<IconHeartFill />:<IconHeart />} onClick={()=>{toggleLike()}}></Button>
        <Button type="text" shape="circle" icon={<IconMessage />}></Button>
        <Button type="text" shape="circle" icon={<IconEye />}></Button>
      </div>
      
    </div>
  )
};

export default observer(TweetItem);
