/**
 *
 * Asynchronously loads the component for Building
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
