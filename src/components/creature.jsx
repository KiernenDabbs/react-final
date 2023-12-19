import React, { useState, useEffect } from "react";
import App from "../App";
import AddCreature from "./AddCreature";
import './AddCreature.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { last, set } from "lodash";

function Creature(props) {

  const[editMode, setEditMode] = useState(false);
  const [creatureName, setCreatureName] = useState("");
  const [creatureType, setCreatureType] = useState("");
  const [armorClass, setArmorClass] = useState();

  useEffect(() => {
    setCreatureName(props.creature.creatureName);
    setCreatureType(props.creature.creatureType);
    setArmorClass(props.creature.armorClass);
  }, []);

  const saveCreature = () => {
    setEditMode(false);
    const updatedCreature = {creatureName:creatureName, creatureType:creatureType, armorClass:armorClass, id:props.creature.id, image:props.creature.image}
    props.updateCreature(updatedCreature)
  }

  return (
    <div className="card">
      <img src={props.creature.images} alt="image not found"
        className="card-img-top mx-auto"/>
        {!editMode &&
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-center">Creature ID: {props.creature.id}</li>
        <li className="list-group-item text-center">Name: {props.creature.creatureName}</li>
        <li className="list-group-item text-center">Type: {props.creature.creatureType}</li>
        <li className="list-group-item text-center">Armor Class: {props.creature.armorClass}</li>
        <button type="button" className="btn btn-warning" onClick={() => setEditMode(true)}>Edit Creature <FontAwesomeIcon icon={faMagicWandSparkles}/></button>
        <button type="button" className="btn btn-danger" onClick={() => props.removeCreature(props.creature)}>Delete Creature <FontAwesomeIcon icon={faWarning}/></button>
      </ul>}
      {editMode &&
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-center">{props.creature.id}</li>
        <li className="list-group-item text-center"><input type="text" className="form-control" value={creatureName} onChange={(evt) => setCreatureName(evt.currentTarget.value)} /></li>
        <li className="list-group-item text-center"><input type="text" className="form-control" value={creatureType} onChange={(evt) => setCreatureType(evt.currentTarget.value)} /></li>
        <li className="list-group-item text-center"><input type="text" className="form-control" value={armorClass} onChange={(evt) => setArmorClass(evt.currentTarget.value)} /></li>
        <li className="list-group-item"><button id='btnSave' className="btn btn-secondary" onClick={saveCreature}>Save</button></li>
      </ul>}
    </div>
  );
}

export default Creature;
