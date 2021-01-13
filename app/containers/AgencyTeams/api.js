import { teams } from 'utils/api';

export function fetchA_Teams(id) {
  return teams.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      agency: id.id,
    },
  });
}

export function createA_Team(data) {
  return teams.create(data.data);
}
