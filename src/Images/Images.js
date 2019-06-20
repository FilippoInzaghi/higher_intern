import React, { Component } from "react";
import "./Images.css";
import axios from "axios";
import Image from "./Image/Image";
import Spinner from "../Spinner/Spinner";
class Images extends Component {
  state = {
    listOfImages: [],
    indexOfLastImage: 3,
    shouldBeDisplayed: false,
  };

  componentDidMount() {
    this.getDataFromServer();
  }

  nextButtonClickedHandler = () => {
    this.getDataFromServer();
    if (this.state.indexOfLastImage >= this.state.listOfImages.length) {
      this.setState({
        indexOfLastImage: 3,
      });
      return;
    }
    this.setState(prevState => ({
      indexOfLastImage: prevState.indexOfLastImage + 3,
    }));
  };

  getDataFromServer = () => {
    this.setState(prevState => ({
      shouldBeDisplayed: false,
    }));
    axios.get(`https://picsum.photos/v2/list`).then(res => {
      const fetchedImages = res.data.map(image => {
        const updatedImageDetails = {
          ...image,
          extractedID: image.url.replace("https://unsplash.com/photos/", ""),
        };
        return updatedImageDetails;
      });
      this.setState(prevState => ({
        listOfImages: fetchedImages,
        shouldBeDisplayed: true,
      }));
    });
  };

  render() {
    let imagesToDisplay = this.state.listOfImages
      .filter(
        (img, index) =>
          index < this.state.indexOfLastImage &&
          index >= this.state.indexOfLastImage - 3
      )
      .map(image => <Spinner key={image.id} />);
    if (this.state.shouldBeDisplayed) {
      imagesToDisplay = this.state.listOfImages
        .filter(
          (img, index) =>
            index < this.state.indexOfLastImage &&
            index >= this.state.indexOfLastImage - 3
        )
        .map(image => <Image key={image.id} image={image} />);
    }
    return (
      <div>
        <div className="images">{imagesToDisplay}</div>
        <button className="nextButton" onClick={this.nextButtonClickedHandler}>
          Next
        </button>
      </div>
    );
  }
}

export default Images;
