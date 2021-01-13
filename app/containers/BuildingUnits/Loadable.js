/**
 *
 * Asynchronously loads the component for BuildingUnits
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
