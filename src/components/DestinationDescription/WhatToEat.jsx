import React from "react";
import "../../pages/DestinationDescription.css";
import WhatToEatCard from "./WhatToEatCard";

const WhatToEat = () => {
  return (
    <>
      <div className="destinationWhatToEatMainBackground">
        <div className="destinationWhatToEatTitle">
          <h2>What To Eat In Paris</h2>
        </div>
        <div className="destinationWhatToEatMainDescriptionContainer">
          <WhatToEatCard invert="false" />
          <WhatToEatCard invert="true" />
          <WhatToEatCard invert="false" />
        </div>
      </div>
    </>
  );
};

export default WhatToEat;
