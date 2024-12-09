import React from "react";
import "../../pages/DestinationDescription.css";
import Divider from "./Divider";
import AvailablePackages from "./AvailablePackages";

const WhereToStay = ({ data, stay, trip }) => {



  const classArr = ["whereToStayFirstCard", "whereToStaySecondCard", 'whereToStayThirdCard', 'whereToStayFourthCard', 'whereToStayFifthCard'];

  return (
    <>
      <div className="destinationWhereToStayMainBackgroundContainer" style={{ backgroundImage: `linear-gradient(to bottom, rgba(17, 19, 19, 0) 0%, rgba(17, 19, 19, 0.2) 40%, #0d0f0f 100%), url(${data[0].IMAGES.split(",")[2]})`, }}>
        <div className="destinationWhereToStayMainHeadingContainer">
          <h2>Where To Stay In Paris</h2>
        </div>
        <div className="destinationWhereToStayCardsContainer">
          {stay.map((s, index) => (
            <>
              <div key={index}
                className="whereToStayCards"
                id={classArr[index]}
                style={{
                  backgroundImage: `url(${s.HOTELIMAGES.split(",")[0]})`
                  ,
                }}
              >
                <h4>{s.HOTELNAME}</h4>
              </div>
            </>
          ))}
          {stay.length == 0 && <p>No Hotels Found</p>}

        </div>
        <AvailablePackages trip={trip} />
      </div>
    </>
  );
};

export default WhereToStay;
