import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const CircleRating = ({ percentage }) => {
  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#0d265a8e",
          textColor: "#fff",
          pathColor: "red",
          trailColor: "transparent",
        })}
      />
    </div>
  );
};

export default CircleRating;
