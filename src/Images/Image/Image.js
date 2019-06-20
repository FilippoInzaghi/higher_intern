import React, { Component } from "react";
import "./Image.css";
const image = props => {
  return (
    <div className="image">
      <img src={`https://source.unsplash.com/${props.image.extractedID}`} alt="" />
    </div>
  );
};

export default image;
