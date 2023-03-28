import React from "react";
import "./DestinationSlider.css";
import leftArrow from "../../../Assets/images/left-arrow1.svg";
import rightArrow from "../../../Assets/images/right-arrow2.svg";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} />
    </button>
  );
}
