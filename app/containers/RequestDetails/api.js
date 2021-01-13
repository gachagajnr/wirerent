import { requests } from 'utils/api';

export function fetchRequest(id) {
  return requests.get(id.id);
}
// assignTask
// export function assignTask(data) {
//   const ref = data.data;
//   return requests.patch(ref.task_id, {
//     teamName: ref.title,
//     team: ref.team_id,
//     assigned: true,
//   });
// }
