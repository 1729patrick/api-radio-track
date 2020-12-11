import redis from 'redis';
import { promisify } from 'util';

class Redis {
  constructor() {
    const client = redis.createClient();

    this.get = promisify(client.get).bind(client);
    this.set = promisify(client.set).bind(client);
    this.reset = promisify(client.flushall).bind(client);
  }
}

export default new Redis();
