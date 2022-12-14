import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios
    .get(baseUrl)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log("getall error", e.message);
    });

  return request;
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => {
    return response.data;
  });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => {
    return response.data;
  });
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => {
    return response.data;
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll: getAll,
  create: create,
  update: update,
  deletePerson: deletePerson,
};
