/**
 *
 * Asynchronously loads the component for Buildings
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
