import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import domtoimage from "dom-to-image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from './components/Pagination'
import DisplayPagination from './components/DisplayPagination'

function App() {
  const [textUp, setTextUp] = useState("");
  const [textDown, setTextDown] = useState("");
  const [images, setImages] = useState([]);
  const [randomImage, setRandomImage] = useState("");
  const [trueState, setTrueState] = useState(true);
  const [counterDelete, setCounterDelete] = useState(false);
  const [counterUpload, setCounterUpload] = useState(false);
  const [uploadPic, setUploadPic] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(10);


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
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        !counterDelete
          ? setImages(response.data.data.memes[0].url)
          : setImages("");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //get random image
  const randomPic = () => {
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

  // delete Image

  const deleteImage = () => {
    setCounterDelete(true);
    setRandomImage("");
  };

  // delete Text
  const deleteInput = () => {
    setTextDown("");
    setTextUp("");
  };

  // upload Pic

  const upload = () => {
    const selectedFile = document.getElementById("input").files[0];
    const objectURL = URL.createObjectURL(selectedFile);

    setCounterUpload(true);
    setUploadPic(objectURL);
    console.log(selectedFile);
  };

  // downLoad image

  const downloadImage = () => {
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

  // Pagination

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = allImages.slice(indexOfFirstImage, indexOfLastImage);


  // Change Number in Paginate

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='App'>
      {
        <Container>
          <Row>
            <Col>
              {/*placeholder stuff within a component input field didn't match */}
              <input
                placeholder='Text above'
                onChange={(e) => setTextUp(e.target.value)}
              />
              <input
                placeholder='Text down'
                onChange={(e) => setTextDown(e.target.value)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Container className='containerImage'>
                {trueState === true ? (
                  <div>
                    {" "}
                    <h2>First Pic from Api</h2>
                    <img src={images} id='image' alt='Meme Pic' />
                  </div>
                ) : (
                  <div>
                    <h2>Random Pic</h2>
                    <img src={randomImage} id='image' alt='Meme Pic' />
                  </div>
                )}
                <div className='up'>{textUp}</div>
                <div className='down'>{textDown}</div>
              </Container>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button variant='primary' onClick={deleteInput}>
                Delete Text
              </Button>{" "}
              <Button variant='success' onClick={randomPic}>
                Random Pic
              </Button>{" "}
              <Button variant='danger' onClick={deleteImage}>
                Delete Image
              </Button>
              <Button variant='success' onClick={downloadImage}>
                Download Image
              </Button>
            </Col>
          </Row>
          ---------------------------------------------------------------------
          <Row>
            <Col>
              <h2>Upload pic</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <input
                type='file'
                id='input'
                placeholder={"Upload pic"}
                multiple
              />
              <Button onClick={upload} variant='success'>
                Upload Pic
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {counterUpload ? (
                <img src={uploadPic} />
              ) : (
                <span>No image has been uploaded</span>
              )}
            </Col>
          </Row>
          --------------------------------------------------------------------
          <Row>
            <Col>
                <Pagination allImages={currentImages}  />
                <DisplayPagination imagesPerPage={imagesPerPage} totalImages={allImages.length} paginate={paginate} />
            </Col>
          </Row>
        </Container>
      }
    </div>
  );
}

export default App;
