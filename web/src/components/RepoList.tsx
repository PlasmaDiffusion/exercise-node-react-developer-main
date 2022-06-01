import { useEffect, useState } from 'react';
import axios from 'axios';
import { Repo } from '../interfaces/Repo';
import RepoDetails from './RepoDetails';

function RepoList() {
  const [repos, setRepos] = useState<Repo[]>([]);

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
      {repos.map((repo) => (
        <>
          <RepoDetails repo={repo} />
        </>
      ))}
    </>
  );
}

export default RepoList;
