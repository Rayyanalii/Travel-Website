import React from "react";
import "../../pages/DestinationDescription.css";
import Divider from "./Divider";
import AvailablePackages from "./AvailablePackages";

const WhereToStay = ({ data, stay }) => {

  console.log(stay);


  const classArr = ["whereToStayFirstCard", "whereToStaySecondCard", 'whereToStayThirdCard', 'whereToStayFourthCard', 'whereToStayFifthCard'];

  return (
    <>
      <div className="destinationWhereToStayMainBackgroundContainer" style={{ backgroundImage: `url(${data[0].IMAGES.split(",")[2]})` }}>
        <div className="destinationWhereToStayMainHeadingContainer">
          <h2>Where To Stay In Paris</h2>
        </div>
        <div className="destinationWhereToStayCardsContainer">
          {stay.map((s, index) => (
            <>
              <div key={index}
                className="whereToStayCards"
                id={classArr[index + 1]}
                style={{
                  backgroundImage: `url(${s.HOTELIMAGES.split(",")[index]})`
                  ,
                }}
              >
                <h4>{s.HOTELNAME}</h4>
              </div>
            </>
          ))}

        </div>
        <Divider />
        <AvailablePackages />
      </div>
    </>
  );
};

export default WhereToStay;
