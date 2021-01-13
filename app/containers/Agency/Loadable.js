/**
 *
 * Asynchronously loads the component for Agency
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
