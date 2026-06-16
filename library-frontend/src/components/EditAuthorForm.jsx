import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS, AMEND_AUTHOR } from "../queries";

const EditAuthorForm = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [amendAuthor] = useMutation(AMEND_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    console.log("edit author...");
    amendAuthor({ variables: { name, setBornTo: Number(born) } });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthorForm;
