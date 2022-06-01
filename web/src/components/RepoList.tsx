import React, { useEffect } from 'react';
import axios from 'axios';

function RepoList() {
  useEffect(() => {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // Just reload the page if there's an error
        console.log(err);
        window.location.reload();
      });
  }, []);

  return <>Test</>;
}

export default RepoList;
