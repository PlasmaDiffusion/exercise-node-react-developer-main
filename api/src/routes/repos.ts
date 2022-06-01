import { Router, Request, Response } from 'express';
import fs from 'fs';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  fs.readFile('data/repos.json', (err: any, data: any) => {
    if (err) {
      throw err;
    }
    const repo = JSON.parse(data);
    console.log(repo);
  });


  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json([]);
});
