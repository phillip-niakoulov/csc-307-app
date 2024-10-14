import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });

    return promise;
  }

  function deleteList(id) {
    removeOneCharacter(id)
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((character, i) => {
            return character._id !== id;
          });
          setCharacters(updated);
        } else if (response.status === 404) {
          throw new Error(`Resource not found, so no object was deleted`);
        } else {
          throw new Error(`${response.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(`${response.status}`);
        }
      })
      .then((data) => {
        setCharacters([...characters, data]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={deleteList}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;