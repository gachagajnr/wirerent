import { buildings, units } from 'utils/api';

export function fetchRooms(organization) {
  return units.find({
    query: {
      $sort: {
        createdAt: -1,
      },
      agent: organization.organization,
      isVacant: true,
    },
  });
}

export function assignnRoom(nroom) {
  const room = nroom.nroom;
  return units.patch(room.room, {
    idnumber: room.idnumber,
    mode: room.mode,
    signed: room.signed,
    request: room.request,
    isOccupied: true,
    isVacant: false,
    notes: room.notes,
  });
}
