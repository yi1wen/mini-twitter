
import { observer } from 'mobx-react-lite';
import { Button, Avatar, Divider, Typography } from '@arco-design/web-react';
import { inputStore } from '../store/TweetInputStore';
import './TweetInput.css';

const {Text} = Typography;

const TweetInput = () => {
    const handleChange = (value: string) => {
        inputStore.setContent(value);

    };
    const handlePublish = () => {
        inputStore.publishTweet();
    };

  return (
    <div className="input-container">
      <div className="input-textarea-container">
        <Avatar>You</Avatar>
        <textarea
          className="input-textarea"
          style={{ resize: 'none', border: 'none', outline: 'none' }}
          placeholder="分享你的想法..."
          rows={inputStore.textareaRows }
          value={inputStore.content}
          onChange={(e)=>{handleChange(e.target.value)}}
      />
      <Text className="input-char-count">{inputStore.content.length}/{inputStore.maxChars}</Text>
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
