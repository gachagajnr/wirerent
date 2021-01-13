/**
 *
 * Asynchronously loads the component for UnitRequests
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
