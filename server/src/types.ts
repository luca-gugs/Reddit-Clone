import { Request, Response } from 'express';
import Redis from 'ioredis';
import { createUserLoader } from './utils/DataLoaders/createUserLoader';
import { createUpdootLoader } from './utils/DataLoaders/createUpdootLoader';
export type MyContext = {
  req: Request & any;
  redis: Redis.Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  updootLoader: ReturnType<typeof createUpdootLoader>;
};
