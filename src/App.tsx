import React from 'react';
import logo from './logo.svg';
import TweetInput from './components/TweetInput';
import TweetList from './components/TweetList';
import './App.css';

function App() {
  return (
    <div className="App">
      <TweetInput />
      <TweetList />
    </div>
  );
}

export default App;
