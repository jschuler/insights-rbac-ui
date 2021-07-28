import { Route, Switch, Redirect } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { AppPlaceholder } from './presentational-components/shared/loader-placeholders';
import { routes } from '../package.json';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import Main from '@redhat-cloud-services/frontend-components/Main';

import { exploreServerlessQuickStart } from './test/quick-start/explore-serverless-quickstart';
import { explorePipelinesQuickStart } from './test/quick-start/explore-pipeline-quickstart';
import addHealthchecksQuickstart from './test/quick-start/create-role.yaml';

const Groups = lazy(() => import('./smart-components/group/groups'));
const Roles = lazy(() => import('./smart-components/role/roles'));
const Users = lazy(() => import('./smart-components/user/users'));
const MyUserAccess = lazy(() => import('./smart-components/myUserAccess/MUAHome'));
const AccessRequests = lazy(() => import('./smart-components/accessRequests/accessRequests'));
const ResourcesCatalog = lazy(() => import('./smart-components/ResourcesCatalog'));

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

  const mainStyles = {
    marginLeft: 0,
    padding: 0,
  };

  return (
    <Suspense fallback={<AppPlaceholder />}>
      <Switch>
        <Route path={routes.groups} component={<Main style={mainStyles}>{Groups}</Main>} />
        <Route path={routes.roles} component={<Main style={mainStyles}>{Roles}</Main>} />
        <Route path={routes.users} component={<Main style={mainStyles}>{Users}</Main>} />
        <Route path={routes['my-user-access']} component={<Main style={mainStyles}>{MyUserAccess}</Main>} />
        <Route path={routes['access-requests']} component={<Main style={mainStyles}>{AccessRequests}</Main>} />
        <Route path={routes.resources} component={ResourcesCatalog} />
        <Route>
          <Redirect to={routes.users} />
        </Route>
      </Switch>
    </Suspense>
  );
};
