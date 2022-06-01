import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RepoList() {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setRepos(res.data);
      })
      .catch((err) => {
        // Just reload the page if there's an error
        console.log(err);
        window.location.reload();
      });
  }, []);

  return (
    <>
      {repos.map((repo, index) => (
        <>
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
          <p>{repo.language}</p>
          <p>Forks: {repo.forks_count}</p>
        </>
      ))}
    </>
  );
}

export default RepoList;
