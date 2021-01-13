import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AppAbility } from './ability';

export const AbilityContext = createContext(AppAbility);

export default createContextualCan(AbilityContext.Consumer);
