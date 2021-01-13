import { requests } from 'utils/api';

export function fetchRequests(organization) {
  return requests.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      agency: organization.organization,
    },
  });
}
// assignTask
export function assignTask(data) {
  const ref = data.data;
  return requests.patch(ref.task_id, {
    teamName: ref.title,
    team: ref.team_id,
    assigned: true,
  });
}
