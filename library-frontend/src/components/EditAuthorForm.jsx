import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS, AMEND_AUTHOR } from "../queries";

const EditAuthorForm = ({ authors }) => {
  const [born, setBorn] = useState("");
  const [author, setAuthor] = useState(authors[0].name);

  const [amendAuthor] = useMutation(AMEND_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    console.log(author);
    amendAuthor({ variables: { name: author, setBornTo: Number(born) } });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <select
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        >
          {authors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
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
