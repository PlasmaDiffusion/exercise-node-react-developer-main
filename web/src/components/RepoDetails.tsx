import { Repo } from '../interfaces/Repo';
import styles from './styles.module.scss';

interface Props {
  repo: Repo;
  selected?: boolean;
}

function RepoDetails({ repo, selected = false }: Props) {
  if (!selected) {
    return (
      <button className={styles.repo}>
        <h3>{repo.name}</h3>
        <p>{repo.description}</p>
        <p>{repo.language}</p>
        <p>Forks: {repo.forks_count}</p>
      </button>
    );
  } else {
    return <></>;
  }
}

export default RepoDetails;
