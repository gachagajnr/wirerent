import React, { useContext } from 'react';
import { AbilityBuilder, Ability, detectSubjectType } from '@casl/ability';
import { AbilityContext } from './Can';
import { AuthContext } from './AuthContext';

export const AppAbility = Ability;
export default function defineRulesFor(role) {
  // console.log("SKDFJHSKDFJSJDFKSF",role)
  const { can, rules } = new AbilityBuilder();
  if (role.resetPassword === true) {
    can('manage', 'notMenu', { field: 'resetpassword' });
  } else if (role.isVerified) {
    if (role.role === 'superuser') {
      // routes
      can('manage', 'Menu', { field: 'superuser' });
    } else if (role.role === 'agency_admin') {
      // routes
      can('manage', 'AdminMenu', { field: 'admin' });
      can('manage', 'SpecialMenu', { field: 'special' });
    } else if (role.role === 'building_admin') {
      // routes
      can('manage', 'BuildingMenu', { field: 'buildingadmin' });
      can('manage', 'SpecialMenu', { field: 'special' });
    } else if (role.role === 'tenant' && role.organization) {
      // routes
      can('manage', 'TenantMenu', { field: 'tenant' });
    } else if (role.role === undefined) {
      can('manage', 'defaultMenu', { field: 'nouser' });
    } else if (role.role === 'agency_admin' && !role.hasOrganization) {
      can('manage', 'createMenu', { field: 'newAdmin' });
    } else if (role.role === 'tenant' && !role.organization) {
      can('manage', 'noRoom', { field: 'newRoom' });
    }
  } else {
    can('manage', 'NotVerifiedMenu', { field: 'notVerified' });
  }

  return rules;
}
/**
 * Read for details: https://stalniy.github.io/casl/v4/en/guide/subject-type-detection
 */
function detectAppSubjectType(subject) {
  if (subject && typeof subject === 'object' && subject.type) {
    return subject.type;
  }
  return detectSubjectType(subject);
}
export function buildAbilityFor(role) {
  return new AppAbility(defineRulesFor(role), {
    detectSubjectType: detectAppSubjectType,
  });
}

export function RoleAbilityProvider(props) {
  const { user } = useContext(AuthContext);
  const ability = buildAbilityFor(user.user);

  return (
    <AbilityContext.Provider value={ability}>
      {props.children}
    </AbilityContext.Provider>
  );
}
