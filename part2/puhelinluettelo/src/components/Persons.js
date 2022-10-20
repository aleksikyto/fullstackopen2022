import Person from "./Person";

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.length >= 0 &&
        persons.map((person, i) => {
          return (
            <div key={i}>
              <Person person={person} deletePerson={deletePerson} />
            </div>
          );
        })}
    </div>
  );
};

export default Persons;
