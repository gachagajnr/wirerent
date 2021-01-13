import { units } from 'utils/api';

export function fetchUnits(organization, isVacant) {
  return units.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      agent: organization.organization,
      isVacant: organization.isVacant,
    },
  });
}
// create room
export function createUnit(data) {
  return units.create(data.data);
}
