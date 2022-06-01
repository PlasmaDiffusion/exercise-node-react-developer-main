import { Repo } from '../interfaces/Repo';

interface Props {
  repo: Repo;
  selected?: boolean;
}

function RepoDetails({ repo, selected = false }: Props) {
  return (
    <>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <p>{repo.language}</p>
      <p>Forks: {repo.forks_count}</p>
      {selected && <p>{repo.commits_url}</p>}
    </>
  );
}

export default RepoDetails;
