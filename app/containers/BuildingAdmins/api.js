import { building_admins } from 'utils/api';

export function fetchB_Admins(id) {
  return building_admins.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      organization: id.id,
    },
  });
}

export function createB_Admin(data) {
  return building_admins.create(data.data);
}
