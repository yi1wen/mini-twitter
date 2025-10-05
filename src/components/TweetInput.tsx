import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './TweetInput.css';
import { Divider, Button, Avatar, Space } from '@arco-design/web-react';

const TweetInput = () => {
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
      setTextareaRows(e.target.value.split('\n').length < 4 ? 4 : e.target.value.split('\n').length);
  };
  const handlePublish = () => {
    if (content.trim()) {
      // tweetStore.publishTweet(content);
      setContent('');
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePublish();
    }
  };

  const [textareaRows, setTextareaRows] = useState<number>(4);

  return (
    <div className="input-container">
      <div className="input-textarea-container">
        <Avatar>You</Avatar>
        <textarea
        className="input-textarea"
        style={{ resize: 'none', border: 'none', outline: 'none' }}
        placeholder="分享你的想法..."
        rows={textareaRows}
        value={content}
        onChange={handleChange}
        // onKeyDown={handleKeyDown}
      />
      </div>
      
      <Divider style={{ height: '1px', margin: '10px 0', backgroundColor: '#ccc' }} />
      <Button
        shape="round"
        onClick={handlePublish}
        disabled={!content.trim()}
      >
        发布
      </Button>
      
    </div>
  );
};

export default observer(TweetInput);
