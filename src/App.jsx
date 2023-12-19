import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { nanoid } from "nanoid";
import AddCreature from "./components/AddCreature";
import _ from "lodash";
import Creature from "./components/creature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './components/AddCreature.css';


function App() {
  const [allCreatures, setAllCreatures] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [armorClass, setArmorClass] = useState("");

  useEffect(() => {
    if (localStorage) {
      const creaturesLocalStorage = JSON.parse(localStorage.getItem("creatures"));
      if (creaturesLocalStorage) {
        saveCreatures(creaturesLocalStorage);
      } else {
        saveCreatures(creatures);
      }
    }
  }, []);

  const saveCreatures = (creatures) => {
    setAllCreatures(creatures);
    setSearchResults(creatures);
    if (localStorage) {
      localStorage.setItem("creatures", JSON.stringify(creatures));
      console.log("saved to local storage");
    }
  };

  const addCreature = (newCreature) => {
    const updatedCreatures = [...allCreatures, newCreature];
    saveCreatures(updatedCreatures);
  };

  const searchCreatures = () => {
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(" ");
    }

    if (armorClass) {
      keywordsArray.push(armorClass.toString());
    }

    if (keywordsArray.length > 0) {
      const searchResults = allCreatures.filter((creature) => {
        for (const word of keywordsArray) {
          if (
            creature.creatureName.toLowerCase().includes(word) ||
            creature.creatureType.toLowerCase().includes(word) ||
            creature.armorClass === parseInt(word)
          ) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allCreatures);
    }
  };

  const removeCreature = (creatureToDelete) => {
    console.table(creatureToDelete);
    const updatedCreaturesArray = allCreatures.filter(
      (creature) => creature.id !== creatureToDelete.id
    );
    saveCreatures(updatedCreaturesArray);
  };

  const updateCreature = (updatedCreature) => {
    //console.table(updatedStudent);
    const updatedCreaturesArray = allCreatures.map((creature) =>
    creature.id === updatedCreature.id
        ? { ...creature, ...updatedCreature }
        : creature
    );
    saveCreatures(updatedCreaturesArray);
  };

  const creatures = [
    {
      id: nanoid(),
      creatureName: "Frost Wyrm",
      creatureType: "Undead/Dragon",
      images: "images/student1.jpg",
      armorClass: 2004,
    },
    {
      id: nanoid(),
      creatureName: "Flame Drake",
      creatureType: "Dragon",
      images: "images/student2.jpg",
      armorClass: 2003,
    },
    {
      id: nanoid(),
      creatureName: "Angel",
      creatureType: "Celestial",
      images: "images/student3.jpg",
      armorClass: 2002,
    },
    {
      id: nanoid(),
      creatureName: "Leopard Knight",
      creatureType: "Humanoid",
      images: "images/humanoid4.jpg",
      armorClass: 2002,
    },
    {
      id: nanoid(),
      creatureName: "Castle Guard",
      creatureType: "Humanoid",
      images: "images/humanoid2.jpg",
      armorClass: 2002,
    },
    {
      id: nanoid(),
      creatureName: "Gargantuan",
      creatureType: "Giant",
      images: "images/giant2.jpg",
      armorClass: 2004,
    },
    {
      id: nanoid(),
      creatureName: "Mimic",
      creatureType: "Monstrosity",
      images: "images/student7.jpg",
      armorClass: 2003,
    },
    {
      id: nanoid(),
      creatureName: "Rotting Husk",
      creatureType: "Undead",
      images: "images/undead1.jpg",
      armorClass: 2003,
    },
    {
      id: nanoid(),
      creatureName: "Deltranoid",
      creatureType: "Humanoid",
      images: "images/student9.jpg",
      armorClass: 2004,
    },
    {
      id: nanoid(),
      creatureName: "Cleric",
      creatureType: "Humanoid",
      images: "images/student10.jpg",
      armorClass: 2003,
    },
  ];

  return (
    <>
      <AddCreature addCreature={addCreature} />
      <div className="row mt-4" id="searchCreatures">
        <h3>Creature Search</h3>
        <div className="col-md-4">
          <label htmlFor="txtKeywords">Creature Search</label>
          <input
            type="text"
            id="txtKeywords"
            className="form-control"
            placeholder="Creature Name"
            onChange={(evt) => setKeywords(evt.currentTarget.value)}
            value={keywords}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="txtSelect">Armor Class Select</label>
          <select
            value={armorClass}
            onChange={(evt) => setArmorClass(evt.currentTarget.value)}
            className="form-select"
            id="txtSelect"
          >
            <option value="">Select AC</option>
            {_(allCreatures)
              .map((creature) => creature.armorClass)
              .sort()
              .uniq()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
              .value()}
          </select>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={searchCreatures}
          >
            Search Creatures <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="container">
        <div className="row" id="allCreatures">
          <h1>All Creatures</h1>
          {searchResults &&
            searchResults.map((creature) => (
              <div className="col-lg-2" key={creature.id}>
                <Creature
                  creature={creature}
                  removeCreature={removeCreature}
                  updateCreature={updateCreature}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
