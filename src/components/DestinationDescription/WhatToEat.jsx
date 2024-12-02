import React from "react";
import "../../pages/DestinationDescription.css";
import WhatToEatCard from "./WhatToEatCard";

const WhatToEat = ({ data, rest }) => {
  return (
    <>
      <div className="destinationWhatToEatMainBackground" style={{ backgroundImage: `url(${data[0].IMAGES.split(",")[1]})` }}>
        <div className="destinationWhatToEatTitle">
          <h2>What To Eat In Paris</h2>
        </div>
        <div className="destinationWhatToEatMainDescriptionContainer">
          {rest && rest.map((r, index) => (
            <WhatToEatCard key={index} data={r} invert={index == 1 ? "true" : "false"} />
          ))}
          {rest.length == 0 && <p>No Restaurants Found</p>}

        </div>
      </div>
    </>
  );
};

export default WhatToEat;
