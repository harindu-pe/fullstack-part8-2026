import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, USER } from "../queries";

const Recommendations = (props) => {
  const user = useQuery(USER);

  const favoriteGenre = user.data?.me?.favoriteGenre;

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  if (user.loading || books.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  return (
    <>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre{" "}
        <span style={{ fontWeight: "bold" }}>{user.data.me.favoriteGenre}</span>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data?.allBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Recommendations;
