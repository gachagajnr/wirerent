import { emails, smsS, units } from 'utils/api';

export function fetchTenants(id) {
  return units.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      building: id.id,
      moveoutRequested: true,
    },
  });
}

export function singleEmail(data) {
  return emails.create(data.data);
}

export function singleSms(data) {
   return smsS.create(data.data);
}
