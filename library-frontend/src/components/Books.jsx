import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  console.log(selectedGenre);

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const allGenres = books.flatMap((book) => book.genres);
  const genres = [...new Set(allGenres)];

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setSelectedGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
