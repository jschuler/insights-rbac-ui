import React from 'react';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const ResourcesCatalog = () => {
  const { QuickStartCatalogPage } = useChrome();
  return <QuickStartCatalogPage />;
};

export default ResourcesCatalog;
