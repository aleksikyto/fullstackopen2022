import Person from "./Person";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.length >= 0 &&
        persons.map((person, i) => {
          return (
            <div key={i}>
              <Person person={person} />
            </div>
          );
        })}
    </div>
  );
};

export default Persons;
