import React, { useState } from "react";
import "../../pages/DestinationDescription.css";

const DestinationBestPlaceCard = ({ data }) => {
  const [hoveredCard, sethoveredCard] = useState(false)

  return (
    <>
      <div
        className={hoveredCard ? "destionationBestPlaceCardContainerActive" : "destionationBestPlaceCardContainer"}
        style={{
          backgroundImage:
            `url(${data.PLACEIMAGES.split(",")[0]})`,
        }}
        onMouseEnter={(e) => sethoveredCard(true)}
        onMouseLeave={(e) => sethoveredCard(false)}

      >
        {hoveredCard && <><div className="hoverBestPlaceCardContainer" >
          <p style={{ textAlign: "center", marginTop: "5%" }}>{data.PLACETITLE}</p></div></>}
      </div>
    </>
  );
};

export default DestinationBestPlaceCard;
