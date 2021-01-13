import { agencies } from 'utils/api';

export function fetchAgencies() {
  return agencies.find({
    query: {
      $sort: {
        createdAt: -1,
      },
    },
  });
}
