import React, { useState } from "react";

const PersonForm = ({ persons, addPerson, updateNum }) => {
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

  const addNew = () => {
    addPerson(newName, number);
  };

  const handleNewName = (event) => {
    const value = event.target.value;
    setNewName(value);
  };

  const handleNumber = (event) => {
    const value = event.target.value;
    setNumber(value);
  };

  const updateNumber = (personObj) => updateNum(number, personObj);

  const handleSubmit = (event) => {
    event.preventDefault();

    //persons array where the input name already exists
    const filteredArrName = persons.filter(
      (person) =>
        person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    );

    //if person exists in the array
    if (filteredArrName.length > 0) {
      //if same number already exists
      if (filteredArrName[0].number === number)
        alert(`${newName} is already added to phonebook`);
      //if number does not exist
      else {
        const up = window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one ?`
        );
        if (up) updateNumber(filteredArrName[0]);
      }
    } else {
      addNew();
    }
    setNewName("");
    setNumber("");
  };

  return (
    <div>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumber} />
        </div>

        <div>
          <button onClick={handleSubmit} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
