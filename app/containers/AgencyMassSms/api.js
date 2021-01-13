import { mass_sms } from 'utils/api';

export function createSMS(data) {
  return mass_sms.create(data.data);
}

export function fetchSMSs(id) {
  return mass_sms.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      organization: id.id,
    },
  });
}

export function deleteSMS(rec) {
  return mass_sms.remove(rec.rec);
}
