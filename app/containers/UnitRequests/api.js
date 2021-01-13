import { requests } from 'utils/api';

export function fetchRequests(id) {
  return requests.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      room: id.id,
    },
  });
}
// create room
export function newRequest(data) {
  return requests.create(data.data);
}

export function cancelRequest(data) {
  console.log(data.data);
  return requests.patch(data.data.id, {
    completed: 'Cancelled',
    cancelReason: data.data.reason,
  });
}
