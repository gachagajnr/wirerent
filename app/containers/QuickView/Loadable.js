/**
 *
 * Asynchronously loads the component for QuickView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
