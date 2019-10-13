const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const app = express();
const { createWriteStream } = require("fs");
const path = require("path");
const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    uploads: [File]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
  }
`;
const storeUpload = ({ stream, filename }) => {
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path.join(__dirname, "uploads/", filename)))
      .on("finish", () => resolve())
      .on("error", reject)
  );
};

const resolvers = {
  Query: {
    uploads: (parent, args) => {}
  },
  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { stream, filename } = await file;

      await storeUpload({ stream, filename });
      return args.file.then(file => {
        // console.log(file);
        return file;
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });
app.use("/uploads", express.static("uploads"));
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
