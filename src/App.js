import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

const [img, setImg] = useState('');


  useEffect (() => {
    axios.
    get("https://api.imgflip.com/get_memes")
    .then((response) => {
      setImg(response.data.data.memes[0].url);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);




  return (
    <div className="App">
     <h1>I can has Memes</h1>
     <div className="holderInputs">
       <input type="text" placeholder="Create your own Meme"></input>
       <button>Send your meme</button>
     </div>
     <div className="holderImage">

      <div className="containerImage">
      <img src={img} alt="memPic" />
      <div class="centerTop">Top Center</div>
      <div class="centerBottom">Bottom Center</div>
      </div>


     </div>
    </div>

  );
}

export default App;
