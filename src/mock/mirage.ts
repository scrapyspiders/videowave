import { createServer } from 'miragejs';
import { mockData } from './mockData';

export const server = createServer({
  routes() {
    this.namespace = 'api';
    this.get('/getVideo', () => mockData[Math.floor(Math.random() * mockData.length)]);
  },
});
