import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [images, setImages] = useState("");

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {

        // set first img of api call as picture
        setImages(response.data.data.memes[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(images);


    /*   images.map((img) => {
      return (
        console.log(img.url)
      )
    })*/

  // returns first Element of images array from API

  // onclick random Pick is rendered


  return (
    <div className='App'>
      <h1>I can has Memes</h1>
      <div className='holderTextInputs'>
        <input type='text' placeholder='Create your own Meme'></input>
        <button>Send your meme</button>
      </div>
      <div className='holderButtonInputs'>
        <button>Random Pic</button>
        <button>Upload Pic</button>
        <button>Generate </button>
      </div>
      <div className='holderImage'>
        <div className='containerImage'>
          <img src={images} alt='memPic' />
          <div class='centerTop'>Top Center</div>
          <div class='centerBottom'>Bottom Center</div>
        </div>
      </div>
    </div>
  );
}

export default App;
