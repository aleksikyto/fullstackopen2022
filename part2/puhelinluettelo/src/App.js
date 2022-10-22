import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

// npx json-server --port=3001 --watch db.json

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, [persons]);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (!persons.find((person) => person.name === newName)) {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setNotificationStyle("success");
          setMessage(`Added '${newName}'`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => console.log("error.message", error.message));
    }

    if (persons.find((person) => person.name === newName)) {
      const personToEdit = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        const newObject = { name: newName, number: newNumber };
        personService
          .update(personToEdit.id, newObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToEdit.id ? person : returnedPerson
              )
            );
            setNotificationStyle("success");
            setMessage(`Modified number of '${newName}'`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setNotificationStyle("error");
            setMessage(`Person '${newName}' was already deleted from server`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== personToEdit.id)
            );
          });
      }
    }
  };

  const deletePerson = (id) => {
    const selectedPerson = persons.filter((person) => person.id === id);
    console.log(selectedPerson);
    personService.deletePerson(id);
    const updatedList = persons.filter((person) => person.id !== id);
    setPersons(updatedList);
    setNotificationStyle("success");
    setMessage(`Deleted person '${selectedPerson[0].name}'`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().match(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      {message !== null && (
        <Notification message={message} notificationStyle={notificationStyle} />
      )}
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
