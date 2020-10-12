import React from "react";

function Spinner() {
  return (
    <div className="lds-ripple__position">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}

export default Spinner;
