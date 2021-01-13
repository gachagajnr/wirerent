import { agency_admins } from 'utils/api';

export function fetchA_Admins(id) {
  return agency_admins.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      organization: id.id,
    },
  });
}

export function createA_Admin(data) {
  return agency_admins.create(data.data);
}
