const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = Book.find({})

      // if (args.author) {
      //   result = result.filter((book) => book.author === args.author)
      // }

      // if (args.genre) {
      //   result = result.filter((book) => book.genres.includes(args.genre))
      // }

      return result
    },
    allAuthors: async () => {
      let result = Author.find({})

      // const bookCountCalculator = (author) =>
      //   books.reduce(
      //     (acc, book) => (book.author === author.name ? acc + 1 : acc),
      //     0
      //   )

      // return authors.map((author) => ({
      //   ...author,
      //   bookCount: bookCountCalculator(author),
      // }))

      return result
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const bookExists = await Book.exists({ title: args.title })

      if (bookExists) {
        throw new GraphQLError(`Title must be unique: ${args.title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        })
      }

      const book = new Book({ ...args })

      return book.save()
    },
    editAuthor: (root, args) => {
      const authorExists = authors.find((author) => author.name === args.name)

      if (authorExists) {
        authors = authors.map((author) => {
          return author.name === args.name
            ? { ...author, born: args.setBornTo }
            : author
        })

        return { name: authorExists.name, born: args.setBornTo }
      } else {
        return null
      }
    },
  },
}

module.exports = resolvers
