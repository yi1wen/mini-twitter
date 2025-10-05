
import TweetInput from './components/TweetInput';
import TweetList from './components/TweetList';
import { Button } from '@arco-design/web-react';
import { inputStore } from "./store/TweetInputStore";
import "@arco-design/web-react/dist/css/arco.css";
import { observer } from 'mobx-react-lite';
import './App.css';

function App() {
  return (
    <div className="App">
      <TweetList />
      {inputStore.visible && <TweetInput />}
      <Button type="primary" long className="button" shape="round" onClick={inputStore.toggleVisible}>Post</Button>
    </div>
  );
}

export default observer(App);
