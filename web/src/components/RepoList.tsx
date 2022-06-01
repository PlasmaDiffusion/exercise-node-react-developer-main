import { useEffect, useState } from 'react';
import axios from 'axios';
import { Repo } from '../interfaces/Repo';
import RepoDetails from './RepoDetails';

import styles from './styles.module.scss';

function RepoList() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [repoSelected, setRepoSelected] = useState(-1);
  //Language filtering states
  const [filtered, setFiltered] = useState<boolean[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setRepos(res.data);

        //Set up a language filter array
        const filterArray: boolean[] = [];
        for (let i = 0; i < res.data.length; i++) {
          filterArray.push(true);
        }
        setFiltered([...filterArray]);
      })
      .catch((err) => {
        // For now just reload the page if there's an error to try again
        console.log(err);
        window.location.reload();
      });
  }, []);

  function filterByLanguage(languageToFilterBy: string) {
    const filterArray: boolean[] = [];

    let turningOffFilter = false;
    // Double tap button to undo filter
    if (languageToFilterBy === selectedLanguage) {
      turningOffFilter = true;
    }

    repos.forEach((repo) => {
      filterArray.push(
        repo.language === languageToFilterBy || turningOffFilter
      );
    });

    setFiltered([...filterArray]);
    if (turningOffFilter) {
      setSelectedLanguage('');
    } else {
      setSelectedLanguage(languageToFilterBy);
    }
  }

  return (
    <>
      {/* Buttons for language filters */}
      {repoSelected === -1 ? (
        <>
          <p>Language Filters</p>
          <div className={styles.filters}>
            <button
              onClick={() => {
                filterByLanguage('PHP');
              }}
            >
              PHP
            </button>
            <button
              onClick={() => {
                filterByLanguage('TypeScript');
              }}
            >
              TypeScript
            </button>
            <button
              onClick={() => {
                filterByLanguage('English');
              }}
            >
              English
            </button>
            <button
              onClick={() => {
                filterByLanguage('French');
              }}
            >
              French
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => {
            setRepoSelected(-1);
          }}
          className={styles.back}
        >
          Back
        </button>
      )}
      {/* Render every repo as a button OR if one is clicked, render that button */}
      {repos.map((repo, index) => (
        <>
          {(repoSelected === index || repoSelected === -1) && filtered[index] && (
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
