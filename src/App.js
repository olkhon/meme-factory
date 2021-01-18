
import './App.css';

function App() {
  return (
    <div className="App">
     <h1>I can has Memes</h1>
     <div className="holderInputs">
       <input type="text" placeholder="Create your own Meme"></input>
       <button>Send your meme</button>
     </div>
     <div className="holderImage">
        <img src="" alt="memPic" />
     </div>
    </div>

  );
}

export default App;
