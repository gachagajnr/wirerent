import { buildings } from 'utils/api';

export function fetchBuilding(id) {
  return buildings.get(id.id);
}
