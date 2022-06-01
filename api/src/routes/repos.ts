import { Router, Request, Response } from 'express';
import fs from 'fs';
import axios from 'axios';
import { Repo } from '../models/Repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  let fileData: Repo[];

  fs.readFile('data/repos.json', (err: any, data: any) => {
    if (err) {
      throw err;
    }
    fileData = JSON.parse(data);
  });

  //After getting data from the file, get it from the github api, then combine and filter it.
  await axios
    .get('https://api.github.com/users/silverorange/repos')
    .then((response: { data: any }) => {
      const gitHubData: Repo[] = response.data;
      const mergedData = [...gitHubData, ...fileData];
      res.status(200).json(filterOutForks(mergedData));
    })
    .catch((err: any) => {
      res.status(500).json({ message: err });
    });
});

function filterOutForks(data: Repo[]) {
  const returnData: Repo[] = [];

  for (let i = 0; i < data.length; i++) {
    for (const key in data[i]) {
      if (key === 'fork') {
        if (!data[i][key]) {
          returnData.push(data[i]);
        }
        continue;
      }
    }
  }

  return returnData;
}
