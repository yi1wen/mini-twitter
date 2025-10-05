
import { observer } from 'mobx-react-lite';
import { Button, Avatar, Divider, Typography, Message } from '@arco-design/web-react';
import { inputStore } from '../store/InputStore';
import './Input.css';
import { IconClose } from '@arco-design/web-react/icon';

const { Text } = Typography;

const Input = () => {
    /** 处理输入框内容变化 */
    const handleChange = (value: string) => {
        inputStore.setInputContent(value);

    };
    /** 处理发布按钮点击 */
    const handlePublish = () => {
        inputStore.publishTweet({
            successCallback: () => {
                // 发布成功后的回调
                // Message.success('发布成功');
            },
            errorCallback: (error) => {
                // 发布失败后的回调
                // Message.error('发布失败, 请稍后重试');
            }
        });
    };

  return (
    <div className="input-container">
        <Button
            className="input-close"
            shape="round"
            onClick={ inputStore.clearInputState }
            icon={<IconClose />}
        />
        <div className="input-content">
            <Avatar>你</Avatar>
            <textarea
            className="input-textarea"
            placeholder="分享你的想法..."
            rows={inputStore.textareaRows }
            value={inputStore.content}
            onChange={(e)=>{handleChange(e.target.value)}}
        />
        <Text className="input-char-count">{inputStore.content.length}/{inputStore.maxChars}</Text>
        </div>
        <Divider />
        <Button
            shape="round"
            onClick={ handlePublish }
            disabled={ !inputStore.content.trim() }
        >
            发布
        </Button>
      
    </div>
  );
};

export default observer(Input);
