import { Route, Switch, Redirect } from 'react-router-dom';
import React, { lazy } from 'react';
import { routes } from '../package.json';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

import { exploreServerlessQuickStart } from './test/quick-start/explore-serverless-quickstart';
import { explorePipelinesQuickStart } from './test/quick-start/explore-pipeline-quickstart';
import addHealthchecksQuickstart from './test/quick-start/create-role.yaml';

const Groups = lazy(() => import('./smart-components/group/groups'));
const Roles = lazy(() => import('./smart-components/role/roles'));
const Users = lazy(() => import('./smart-components/user/users'));
const MyUserAccess = lazy(() => import('./smart-components/myUserAccess/MUAHome'));
const AccessRequests = lazy(() => import('./smart-components/accessRequests/accessRequests'));

export const Routes = () => {
  const experimentalChrome = localStorage.getItem('experimental:useChrome') === 'true';
  const chrome = useChrome();
  try {
    if (experimentalChrome) {
      console.group('Experimental API notice');
      console.log('Using experimental chrome API "useChrome"');
      console.log('Api value: ', chrome);
      console.groupEnd();
    }
  } catch (error) {
    /**
     * Do nothing does not break UI
     */
  }

  React.useEffect(() => {
    const { quickStarts } = chrome;
    experimentalChrome && quickStarts.set([exploreServerlessQuickStart, explorePipelinesQuickStart, addHealthchecksQuickstart]);
  }, []);

  return (
    <Switch>
      <Route path={routes.groups}>
        <Groups />
      </Route>
      <Route path={routes.roles}>
        <Roles />
      </Route>
      <Route path={routes.users}>
        <Users />
      </Route>
      <Route path={routes['my-user-access']}>
        <MyUserAccess />
      </Route>
      <Route path={routes['access-requests']}>
        <AccessRequests />
      </Route>
      <Route>
        <Redirect to={routes.users} />
      </Route>
    </Switch>
  );
};
