import { observer } from 'mobx-react-lite';
import { Avatar, Button, Card, Space } from '@arco-design/web-react';
import { IconHeart, IconMessage, IconEye, IconHeartFill } from '@arco-design/web-react/icon';
import './TweetItem.css';
import { TweetStore } from '../store/TweetStore';

interface TweetItemProps {
  tweet: TweetStore
}

const TweetItem = (
    { tweet }: TweetItemProps
) => {
  const {toggleLike, avatar, content, likes} = tweet
  return (
    <Card
        style={{ width: '100%' }}
        className='card-custom-hover-style'
        hoverable
      >
      
        <div className="item-content">
          <Avatar>{avatar}</Avatar>
          <div className="item-text"><textarea value={content} readOnly rows={content.split('\n').length}></textarea></div>
        </div>
        <div className="item-actions">
          <Space>
            <Button type="text" shape="circle" icon={tweet.isLiked?<IconHeartFill />:<IconHeart />} onClick={()=>{toggleLike()}}></Button>
            <span style={{ marginLeft: '-8px' }}>{likes}</span>
          </Space>
          <Button type="text" shape="circle" icon={<IconMessage />}></Button>
          <Button type="text" shape="circle" icon={<IconEye />}></Button>
        </div>
        
    
      </Card>
    
  )
};

export default observer(TweetItem);
