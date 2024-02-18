import React from "react";
import "./DogForm.css";

function DogForm({ data, onChange, validation ,onAdd}) {
  return (
    <div className="dog-form">
      <input
        type="text"
        placeholder="jméno psa"
        name="name"
        value={data.name}
        onChange={onChange}
      ></input>
      <input
        type="text"
        placeholder="rasa psa"
        name="breed"
        value={data.breed}
        onChange={onChange}
      ></input>
      <input
        type="number"
        placeholder="věk psa"
        name="age"
        min="0"
        max="18"
        value={data.age}
        onChange={onChange}
      ></input>
      <button onClick={onAdd} disabled={!validation}>Přidat</button>
    </div>
  );
}

export default DogForm;
