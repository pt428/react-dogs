import React, { useEffect, useState } from "react";
import "./ShelterForm.css";

function ShelterForm({onAdd}) {
  const [tempStorage, setTempStorage] = useState({
    food: "",
    vaccine: "",
    pills: "",
  });


  const[disable, setDisable]=useState(true);

  const handleStorage = (event) => {
    setTempStorage({ ...tempStorage, [event.target.name]: event.target.value });
  };

  useEffect(()=>{
    const temp =(tempStorage.food ==="" || parseInt(tempStorage.food) === 0 ) &&
    (tempStorage.vaccine ==="" || parseInt(tempStorage.vaccine) === 0 ) &&
    (tempStorage.pills ==="" || parseInt(tempStorage.pills) === 0 );
    setDisable(temp)

  },[tempStorage]);

  const handleClick = () => {
    const storageToSend = {
        food:tempStorage.food ==="" ? 0 : parseInt(tempStorage.food),
        vaccine: tempStorage.vaccine === "" ? 0 :parseInt(tempStorage.vaccine),
        pills:tempStorage.pills === "" ? 0 :parseInt(tempStorage.pills)
    }
     onAdd(storageToSend);

    setTempStorage({
        food: "",
        vaccine: "",
        pills: ""
    })
  };

  return (
    <div className="shelter-form">
      <input
        type="number"
        placeholder="granule (kg)"
        name="food"
        min="0"
        value={tempStorage.food}
        onChange={handleStorage}
      ></input>

      <input
        type="number"
        placeholder="vakciny (ks)"
        name="vaccine"
        min="0"
        value={tempStorage.vaccine}
        onChange={handleStorage}
      ></input>

      <input
        type="number"
        placeholder="léky (ks)"
        name="pills"
        min="0"
        value={tempStorage.pills}
        onChange={handleStorage}
      ></input>

      <button disabled={disable} onClick={handleClick}>Doplnit zásoby</button>
    </div>
  );
}

export default ShelterForm;
