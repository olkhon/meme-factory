import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [images, setImages] = useState("");

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        setImages(response.data.data.memes);
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
  let firstImageUrl = images[0].url;


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
          <img src={firstImageUrl} alt='memPic' />
          <div class='centerTop'>Top Center</div>
          <div class='centerBottom'>Bottom Center</div>
        </div>
      </div>
    </div>
  );
}

export default App;
