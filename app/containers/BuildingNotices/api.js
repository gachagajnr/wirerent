import { notices } from 'utils/api';

export function fetchB_Notices(id) {
  return notices.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      building: id.id,
    },
  });
}

export function newB_Notice(data) {
  return notices.create(data.data);
}
