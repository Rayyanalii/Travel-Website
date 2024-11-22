import React from "react";
import "../../pages/DestinationDescription.css";
import Divider from "./Divider";
import AvailablePackages from "./AvailablePackages";

const WhereToStay = () => {
  return (
    <>
      <div className="destinationWhereToStayMainBackgroundContainer">
        <div className="destinationWhereToStayMainHeadingContainer">
          <h2>Where To Stay In Paris</h2>
        </div>
        <div className="destinationWhereToStayCardsContainer">
          <div
            className="whereToStayCards"
            id="whereToStayFirstCard"
            style={{
              backgroundImage:
                'url("/Uploads/ParisDestinationBackgroundImage.png")',
            }}
          >
            <h4>Hello</h4>
          </div>
          <div
            className="whereToStayCards"
            id="whereToStaySecondCard"
            style={{
              backgroundImage:
                'url("/Uploads/ParisDestinationBackgroundImage.png")',
            }}
          >
            <h4>Hello</h4>
          </div>
          <div
            className="whereToStayCards"
            id="whereToStayThirdCard"
            style={{
              backgroundImage:
                'url("/Uploads/ParisDestinationBackgroundImage.png")',
            }}
          >
            <h4>Hello</h4>
          </div>
          <div
            className="whereToStayCards"
            id="whereToStayFourthCard"
            style={{
              backgroundImage:
                'url("/Uploads/ParisDestinationBackgroundImage.png")',
            }}
          >
            <h4>Hello</h4>
          </div>
          <div
            className="whereToStayCards"
            id="whereToStayFifthCard"
            style={{
              backgroundImage:
                'url("/Uploads/ParisDestinationBackgroundImage.png")',
            }}
          >
            <h4>Hello</h4>
          </div>
        </div>
        <Divider />
        <AvailablePackages />
      </div>
    </>
  );
};

export default WhereToStay;
