import { units, special_notice, smsS, emails } from 'utils/api';

export function fetchUnit(id) {
  return units.get(id.id);
}

export function requestMove(room) {
  return units.patch(room.room, { type: 'move' });
}

export function createNotice(notice) {
  return special_notice.create(notice.notice);
}

export function cancelMove(room) {
  return units.patch(room.room, { type: 'cancel' });
}

export function sendEmail(data) {
  return emails.create(data.data);
}

export function sendSms(data) {
  return smsS.create(data.data);
}

export function vacateUser(id) {
  return units.patch(id.id, { type: 'vacate' });
}
