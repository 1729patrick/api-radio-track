import { paginate } from 'mongoose-paginate-v2';

paginate.options = {
  lean: true,
  limit: 12,
  leanWithId: false,
  customLabels: { docs: 'items', totalDocs: 'totalItems' },
};
