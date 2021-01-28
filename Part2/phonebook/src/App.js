import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import axios from "axios";
import personServ from "./services/personService";
import PhoneMessage from "./Components/PhoneMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [redMsg, setredMsg] = useState(true)

  useEffect(() => {
    console.log("calling useEffect");
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const handleFilter = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  //array containing matching input name
  const fileredArr = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const addPerson = (name, number) => {
    const newPerson = {
      name,
      number,
    };

    personServ
      .create(newPerson)
      .then((returnedRes) => {
        setredMsg(false);
        setPersons(persons.concat(returnedRes));
        setErrorMessage("Added " + newPerson.name);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePerson = (id, name) => {
    const del = window.confirm(`Delete ${name} ?`);
    if (del)
      personServ.deleteP(id).then((res) => {
        setPersons((prev) => prev.filter((person) => person.id !== id));
      });
  };

  const updatePersonNum = (number, personObj) => {
    const changedNum = {
      ...personObj,
      number: number,
    };
    personServ
      .update(personObj.id, changedNum)
      .then((returnedRes) =>
        setPersons((prev) =>
          prev.map((p) => (personObj.id === p.id ? returnedRes : p))
        )
      )
      .catch((err) => {
        setredMsg(true);
        setErrorMessage(
          `Information of ${changedNum.name} has already been removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  return (
    <div>
      <h2>PhoneBook</h2>
      <PhoneMessage errorMsg={errorMessage} msgColor={redMsg} />
      <Filter search={search} handleFilter={handleFilter} />
      <h2>Add a New</h2>
      <PersonForm
        persons={persons}
        addPerson={addPerson}
        updateNum={updatePersonNum}
      />

      <h2>Numbers</h2>
      <Persons persons={fileredArr} onDelete={deletePerson} />
    </div>
  );
};

export default App;
