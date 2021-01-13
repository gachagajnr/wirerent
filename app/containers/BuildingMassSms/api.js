import { building_mass_sms } from 'utils/api';

export function sendSms(data) {
  return building_mass_sms.create(data.data);
}

export function fetchSmses(id) {
  return building_mass_sms.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      building: id.id,
    },
  });
}
