import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import Test from "./test.js";

import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const link = createUploadLink({ uri: "http://localhost:4000/graphql" });

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Test />
      </div>
    </ApolloProvider>
  );
}

export default App;
