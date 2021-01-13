import { units, emails, smsS } from 'utils/api';

export function fetchTenants(organization) {
  return units.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      agent: organization.organization,
      moveoutRequested: true,
    },
  });
}

export function singleEmail(data) {
  return emails.create(data.data);
}

export function singleSms(data) {
  console.log(data.data);
  return smsS.create(data.data);
}
