const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button
        onClick={() => {
          if (window.confirm("Delete this person?")) {
            deletePerson(person.id);
          }
        }}
      >
        delete
      </button>
    </li>
  );
};

export default Person;
