import { useEffect, useState } from "react";
import "./App.css";
import rawData from "./dogsData.json";
import "@fontsource/roboto";
import PageContainer from "./components/PageContainer/PageContainer";
import DogList from "./components/DogList/DogList";
import DogForm from "./components/DogForm/DogForm";
import Toggler from "./components/Toggler/Toggler";
import ShelterForm from "./components/ShelterForm/ShelterForm";

function App() {
  const [listOfDogs, setlistOfDogs] = useState(rawData.dogs);
  const [newDog, setNewDog] = useState({
    id:
      listOfDogs.length > 0
        ? Math.max(...listOfDogs.map((dog) => dog.id)) + 1
        : 1,
    name: "",
    breed: "",
    age: "",
  });

  const [valid, setValid] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [shelterStorage, setShelterStorage] = useState({
    food: 35,
    vaccine: 15,
    pills: 20,
  });

  const dogsRequirements = {
    food: 5,
    vaccine: 1,
    pills: 2,
  };
  const handleAddToStorage = (temp) => {
    const temporaryStorage = {
      food:shelterStorage.food + temp.food,
      vaccine:shelterStorage.vaccine + temp.vaccine,
      pills:shelterStorage.pills + temp.pills
    }
    setShelterStorage(temporaryStorage)
  };

  const validateData = (dog) => {
    if (dog.age === "" || dog.age < 0 || dog.age > 18) {
      setValid(false);
    } else if (dog.name.trim().length === 0) {
      setValid(false);
    } else if (dog.breed.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleChange = (event) => {
    const updatedDog = { ...newDog, [event.target.name]: event.target.value };
    validateData(updatedDog);
    setNewDog(updatedDog);
  };

  const handleAdd = () => {
    const totalRequirements = {
      food: (listOfDogs.length + 1) * dogsRequirements.food,
      vaccine: (listOfDogs.length + 1) * dogsRequirements.vaccine,
      pills: (listOfDogs.length + 1) * dogsRequirements.pills,
    };
    if (
      totalRequirements.food <= shelterStorage.food &&
      totalRequirements.vaccine <= shelterStorage.vaccine &&
      totalRequirements.pills <= shelterStorage.pills
    ) {
      setlistOfDogs((listOfDogs) => {
        return [...listOfDogs, newDog];
      });
      const newDogId = newDog.id + 1;
      const updatedDog = {
        id: newDogId,
        name: "",
        breed: "",
        age: "",
      };
      setNewDog(updatedDog);
      validateData(updatedDog);
    } else {
      alert("nedostatek zásob pro přidání nového psa");
    }
  };

  const handleDelete = (idToDelete) => {
    setlistOfDogs(listOfDogs.filter((dog) => dog.id !== idToDelete));
  };

  const handleChoose = (source) => {
    switch (source) {
      case "shelter-storage": {
        setActiveTab(1);
        break;
      }
      case "list-of-dogs": {
        setActiveTab(2);
        break;
      }
      default:
        break;
    }
  };
  // useEffect(() => {
  //   console.log(listOfDogs);
  // }, [listOfDogs]); //,[]); provede se pouze pri spusteni

  return (
    <div className="App">
      <PageContainer>
        <Toggler active={activeTab} onChoose={handleChoose}></Toggler>
        {activeTab === 1 && (
          <>
            <DogList data={listOfDogs} onDelete={handleDelete} />
            <DogForm
              data={newDog}
              onChange={handleChange}
              validation={valid}
              onAdd={handleAdd}
            ></DogForm>
          </>
        )}
        {activeTab === 2 && (
          <>
            <h3>Aktuální zásoby</h3>
            <p>granule: {shelterStorage.food}</p>
            <p>vakcíny: {shelterStorage.vaccine}</p>
            <p>medikamenty: {shelterStorage.pills}</p>
            <ShelterForm onAdd={handleAddToStorage}></ShelterForm>
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default App;
