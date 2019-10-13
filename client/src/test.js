import React from "react";
import { useMutation, ApolloProvider } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
const UPLOAD_FILE = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;
const Profile = client => {
  const [addfile, { adduserloading, addusererror }] = useMutation(UPLOAD_FILE);
  const upload = async e => {
    const file = e.target.files[0];
    console.log(file);
    addfile({ variables: { file } })
      .then(data => {
        console.log("workk", data);
      })
      .catch(er => er);
  };
  return (
    <div>
      <input type="file" required onChange={upload} />;
    </div>
  );
};

export default Profile;
