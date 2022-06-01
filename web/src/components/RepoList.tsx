import React, { useEffect } from 'react';
import axios from 'axios';

function RepoList() {
  useEffect(() => {
    axios.get('http://localhost:4000/repos').then((res) => {
      console.log(res);
    });
  }, []);

  return <>Test</>;
}

export default RepoList;
