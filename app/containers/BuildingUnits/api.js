import { emails, smsS, units } from 'utils/api';

export function fetchUnits(id, isVacant) {
  return units.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      building: id.id,
      isVacant: id.isVacant,
    },
  });
}

export function singleEmail(data) {
  return emails.create(data.data);
}

export function singleSms(data) {
  return smsS.create(data.data);
}
