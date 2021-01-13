import { requests } from 'utils/api';

export function fetchB_Requests(id) {
  return requests.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      building: id.id,
    },
  });
}
