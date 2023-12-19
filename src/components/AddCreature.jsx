import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddCreature.css';

function AddCreature(props) {
  // id, creatureName, creatureType, photo
  const [creatureName, setCreatureName] = useState("");
  const [creatureType, setCreatureType] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [armorClass, setArmorClass] = useState();

  const doWork = () => {
    const newCreature = {
      id: nanoid(),
      creatureName: creatureName,
      creatureType: creatureType,
      images: URL.createObjectURL(selectedFile),
      armorClass: parseInt(armorClass),
    };
    props.addCreature(newCreature);
  };

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="row" id="addCreature">
      <h3>Add Creature</h3>
      <div className="col-md-2">
        <label htmlFor="txtcreatureName" className="form-label">
          Creature Name
        </label>
        <input
          type="text"
          id="txtcreatureName"
          placeholder="Creature Name"
          className="form-control"
          onChange={(evt) => setCreatureName(evt.currentTarget.value)}
          value={creatureName}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="txtcreatureType" className="form-label">
          Creature Type
        </label>
        <input
          type="text"
          id="txtcreatureType"
          placeholder="Creature Type"
          className="form-control"
          onChange={(evt) => setCreatureType(evt.currentTarget.value)}
          value={creatureType}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="fileUpload" className="form-label">
          Creature Image
        </label>
        <input
          type="file"
          name="file"
          id="fileUpload"
          className="form-control"
          onChange={imageUpdate}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="txtarmorClass" className="form-label">
          Armor Class
        </label>
        <input
          type="text"
          placeholder="1 - 20"
          id="txtarmorClass"
          className="form-control"
          onChange={(evt) => setArmorClass(evt.currentTarget.value)}
          value={armorClass}
        />
      </div>
      <div className="col-md-2">
        <button
          type="button"
          id="btnAdd"
          className="btn btn-success btn-lg"
          onClick={doWork}
        >
          Add Creature <FontAwesomeIcon icon={faPlusCircle}/>
        </button>{" "}
      </div>
    </div>
  );
}

export default AddCreature;
