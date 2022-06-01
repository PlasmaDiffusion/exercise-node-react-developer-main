import { Router, Request, Response } from 'express';
import fs from 'fs';
import axios from 'axios';
import { Repo } from '../models/Repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  fs.readFile('data/repos.json', (err: any, data: any) => {
    if (err) {
      throw err;
    }
    const repo = JSON.parse(data);
    // console.log(repo);
  });

  await axios
    .get('https://api.github.com/users/silverorange/repos')
    .then((response: { data: any }) => {
      // console.log(response.data);
      const gitHubData: Repo[] = response.data;
      filterOutNoForks(gitHubData);
    })
    .catch((err: any) => {
      res.status(500).json({ message: err });
    });

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json([]);
});

function filterOutNoForks(data: Repo[]) {

  let returnData: Repo[] = [];

  for (let i = 0; i < data.length; i++) {
    for (const key in data[i]) {
      // console.log(key);
      if (key === 'fork') {
        console.log("fork", data[i][key]);
      }
    }
  }

}
