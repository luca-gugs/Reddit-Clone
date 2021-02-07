import { Request, Response } from 'express';
import Redis from 'ioredis';
export type MyContext = {
  req: Request & any;
  redis: Redis.Redis;
  res: Response;
};
