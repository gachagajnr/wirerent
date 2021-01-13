import { buildings } from 'utils/api';

export function fetchBuildings(organization) {
  return buildings.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      agent: organization.organization,
    },
  });
}

export function saveBuilding(data) {
  return buildings.create(data.data);
}
