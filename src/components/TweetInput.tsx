import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const TweetInput = () => {
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value)
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

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 transition-all duration-300 hover:shadow-md">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
        placeholder="分享你的想法..."
        rows={4}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="flex justify-between items-center mt-3">
        <button
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            content.trim()
              ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-md hover:shadow-lg'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handlePublish}
          disabled={!content.trim()}
        >
          发布推文
        </button>
      </div>
    </div>
  );
};

export default observer(TweetInput);
