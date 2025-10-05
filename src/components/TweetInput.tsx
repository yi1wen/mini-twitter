import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Typography, Avatar, Divider } from '@arco-design/web-react';
import { inputStore } from '../store/TweetInputStore';
import './TweetInput.css';

const { Text } = Typography;

const TweetInput = () => {
    const handleChange = (value: string) => {
        inputStore.setContent(value);
    };
    const handlePublish = () => {
        inputStore.publishTweet();
    };

    // 回车键发布
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handlePublish();
        }
    };

  return (
    <div className="input-container">
      <div className="input-textarea-container">
        <Avatar>You</Avatar>
        <textarea
          className="input-textarea"
          style={{ resize: 'none', border: 'none', outline: 'none' }}
          placeholder="分享你的想法..."
          rows={inputStore.textareaRows}
          value={inputStore.content}
          onChange={(e)=>{handleChange(e.target.value)}}
          onKeyDown={handleKeyDown}
      />
      </div>
      
      <Divider style={{ height: '1px', margin: '10px 0', backgroundColor: '#ccc' }} />
      <Button
        shape="round"
        onClick={handlePublish}
        disabled={!inputStore.content.trim()}
      >
        发布
      </Button>
      
    </div>
  );
};

export default observer(TweetInput);
