import { buildings, units } from 'utils/api';

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

export function createnRoom(nroom) {
  return units.create(nroom.nroom);
}
