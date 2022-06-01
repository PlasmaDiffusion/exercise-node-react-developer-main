import { useEffect, useState } from 'react';
import axios from 'axios';
import { Repo } from '../interfaces/Repo';
import RepoDetails from './RepoDetails';

import styles from './styles.module.scss';

function RepoList() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [repoSelected, setRepoSelected] = useState(-1);

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
    //Render every repo as a button OR if one is clicked, render that button
    <>
      {repos.map((repo, index) => (
        <>
          {(repoSelected === index || repoSelected === -1) && (
            <button
              type="button"
              key={repo.name}
              className={styles.repo}
              onClick={() => {
                setRepoSelected(index);
              }}
            >
              <RepoDetails repo={repo} selected={repoSelected === index} />
            </button>
          )}
        </>
      ))}
    </>
  );
}

export default RepoList;
