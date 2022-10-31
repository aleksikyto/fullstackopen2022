const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123123",
  },
  {
    id: 2,
    name: "Arto Kellas",
    number: "040-111111",
  },
  {
    id: 3,
    name: "Arto Mellas",
    number: "040-222222",
  },
  {
    id: 4,
    name: "Arto Rellas",
    number: "040-333333",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or body missing",
    });
  }

  if (!persons?.filter((person) => person.name === body.name).length) {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    };

    persons = persons.concat(person);

    response.json(person);
  }

  if (persons?.filter((person) => person.name === body.name).length) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
});

app.get("/info", (req, res) => {
  const now = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${now}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
