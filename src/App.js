import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import domtoimage from "dom-to-image";

function App() {
  const [images, setImages] = useState("");
  const [randomImage, setRandomImage] = useState("");
  const [trueState, setTrueState] = useState(true);
  const [textUp, setTextUp] = useState("");
  const [textDown, setTextDown] = useState("");
  const [counterDelete, setCounterDelete] = useState(false);
  const [allImages, setAllImages] = useState("");

  /*
  axios
  .get("https://api.imgflip.com/get_memes")
  .then((response) => {
    setAllImages(response.data.data.memes);
  })
  .catch((error) => {
    console.log(error)
  });
*/

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        setAllImages(response.data.data);
        console.log(allImages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

/*
  allImages.map((img) => {
    return (
      <div>
        {img.url}
      </div>
    )
  })
*/






  /*
  console.log(allImages);
*/


  useEffect(() => {
    // get first image
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        // set first img of api call as picture
        counterDelete === false
          ? setImages(response.data.data.memes[0].url)
          : setImages("");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //get random image
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

  const deleteInput = () => {
    setTextDown("");
    setTextUp("");
    setCounterDelete(true);
    setRandomImage("");
  };

  const downloadCurrentImage = () => {
    domtoimage
      .toJpeg(document.getElementById("image"), {
        quality: 0.8,
        filter: (node) => node.tagName !== "a",
      })
      .then(function (dataUrl) {
        let link = document.createElement("a");
        link.download = "currentImage.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className='App'>
      <h1>I can has Memes</h1>
      <div className='holderTextInputs'>
        <input
          type='text'
          placeholder='Type in above text'
          onChange={(e) => setTextUp(e.target.value)}
        />
        <input
          type='text'
          placeholder='Type in downtext'
          onChange={(e) => setTextDown(e.target.value)}
        />
      </div>
      <div className='holderButtonInputs'>
        <button onClick={getRandomImg}>Random Pic</button>
        <button>Upload Pic</button>
        <button onClick={deleteInput}>Delete Text Input</button>
        <button onClick={downloadCurrentImage}>Download current image</button>
      </div>
      <div className='holderImage'>
        <div className='containerImage'>
          {trueState === true ? (
            <img src={images} id='image' alt='Meme Pic' />
          ) : (
            <img src={randomImage} id='image' alt='Meme Pic' />
          )}
          <div className='containerText'>
            <div class='centerTop'>{textUp}</div>
            <div class='centerBottom'>{textDown}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
