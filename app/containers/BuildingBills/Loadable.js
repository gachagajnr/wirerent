/**
 *
 * Asynchronously loads the component for BuildingBills
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
