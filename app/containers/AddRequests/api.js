import { add_requests } from 'utils/api';

export function fetchRequests(id) {
  return add_requests.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      agency: id.id,
    },
  });
}
export function flagRequest(req) {
  return add_requests.patch(req.req, {
    isFlagged: true,
  });
}
