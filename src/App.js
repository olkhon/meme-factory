import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [images, setImages] = useState("");
  const [randomImage, setRandomImage] = useState("");
  const [trueState, setTrueState] = useState(true);
  axios
    .get("https://api.imgflip.com/get_memes")
    .then((response) => {
      // set first img of api call as picture
      setImages(response.data.data.memes[0].url);
    })
    .catch((error) => {
      console.log(error);
    });

  const getRandomImg = () => {
    let randomNumber = Math.floor(Math.random() * 99);

    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        // random img on click
        setRandomImage(response.data.data.memes[randomNumber].url);
        setTrueState(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='App'>
      <h1>I can has Memes</h1>
      <div className='holderTextInputs'>
        <input type='text' placeholder='Create your own Meme'></input>
        <button>Send your meme</button>
      </div>
      <div className='holderButtonInputs'>
        <button onClick={getRandomImg}>Random Pic</button>
        <button>Upload Pic</button>
        <button>Generate </button>
      </div>
      <div className='holderImage'>
        <div className='containerImage'>
          {trueState === true ?
            <img src={images} alt='Meme Pic' />
           :
            <img src={randomImage} alt='Meme Pic' />
          }

          <div class='centerTop'>Top Center</div>
          <div class='centerBottom'>Bottom Center</div>
        </div>
      </div>
    </div>
  );
}

export default App;
