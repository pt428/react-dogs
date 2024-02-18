import React from "react";
import "./Toggler.css";

function Toggler({ active,onChoose }) {

const handleClick = (event) => {
    onChoose(event.target.name);
    }
 


  return (
    <div className="page-toggler">
      <button className={`toggler-btn ${active === 1 ? "active" : ""} `}
      onClick={handleClick}
      name="shelter-storage"
        >Seznam psu
      </button>
      <button 
      className={`toggler-btn ${active === 2 ? "active" : ""} `}
       onClick={handleClick}
       name="list-of-dogs"
      >
        Sklad útulku
      </button>
    </div>
  );
}

export default Toggler;
