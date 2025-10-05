
import TweetInput from './components/TweetInput';
import TweetList from './components/TweetList';
import "@arco-design/web-react/dist/css/arco.css";
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
