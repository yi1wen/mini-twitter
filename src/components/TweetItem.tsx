import { observer } from 'mobx-react-lite';
import { Avatar, Button, Card, Space, Typography } from '@arco-design/web-react';
import { IconHeart, IconMessage, IconEye, IconHeartFill } from '@arco-design/web-react/icon';
import './TweetItem.css';
import { TweetItemStore } from '../store/TweetItemStore';

const { Text } = Typography;

interface TweetItemProps {
  tweet: TweetItemStore
}

const TweetItem = (
    { tweet }: TweetItemProps
) => {

  const { toggleLike, avatar, content, likes } = tweet

  return (
    <Card
        className='item-card-hover-style'
        hoverable
      >
        <div className="item-content">
          <Avatar>{ avatar }</Avatar>
          <Text className="item-content-text">{ content }</Text>
        </div>
        <div className="item-actions">
          <Space>
            <Button type="text" shape="circle" icon={ tweet.isLiked ? <IconHeartFill /> : <IconHeart />} onClick={ toggleLike } />
            <span className="item-actions-heart-number">{ likes }</span>
          </Space>
          <Button type="text" shape="circle" icon={ <IconMessage /> }></Button>
          <Button type="text" shape="circle" icon={ <IconEye />} ></Button>
        </div>
      </Card>
    
  )
};

export default observer(TweetItem);
