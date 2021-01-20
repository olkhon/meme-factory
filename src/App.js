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
  const [counterUpload, setCounterUpload] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [uploadPic, setUploadPic] = useState([]);

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
        setAllImages(response.data.data.memes);
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
  };

  const deleteImage = () => {
    setCounterDelete(true);
    setRandomImage("");
  };


  const upload = () => {
    alert('text');
    const selectedFile = document.getElementById('input').files[0];
    setCounterUpload(true);
    setUploadPic(selectedFile);
    console.log(selectedFile);
  }

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
        <input type="file" id="input" placeholder={'Upload pic'} multiple /><button onClick={upload}>Upload</button>
        <button onClick={deleteInput}>Delete Text Input</button>
        <button onClick={deleteImage}>Delete Image</button>
        <button onClick={downloadCurrentImage}>Download current image</button>

      </div>
      <div className='holderImage'>

        <div className='containerImage'>
          {
         counterUpload === false ?
          trueState === true  ? (
            <img src={images} id='image' alt='Meme Pic' />
          ) : (
            <img src={randomImage} id='image' alt='Meme Pic' />
          )
            :
            <img src={uploadPic} id='image' alt='Meme Pic' />

        }
          <div className='containerText'>
            <div class='centerTop'>{textUp}</div>
            <div class='centerBottom'>{textDown}</div>
          </div>
        </div>
      </div>
      <div className='holderGallery'>

        {/*

           {allImages.map((img, index) => {
          return (
            <div>
              <img src={img.url} alt={index} />
            </div>
          );
        })}

        */}


        {/*

{allImages.map(({id, name, url}) => {
                return (
               <div key={id}>
                 <img src={url} alt={name} />

                 </div>
                )
              })}
*/}
      </div>
    </div>
  );
}

export default App;
