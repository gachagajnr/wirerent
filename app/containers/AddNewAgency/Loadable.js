/**
 *
 * Asynchronously loads the component for AddNewAgency
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
