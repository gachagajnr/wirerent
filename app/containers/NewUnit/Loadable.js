/**
 *
 * Asynchronously loads the component for NewUnit
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
