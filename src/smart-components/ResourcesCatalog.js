import React from 'react';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const ResourcesCatalog = () => {
  const {
    quickStarts: { Catalog },
  } = useChrome();
  return <Catalog />;
};

export default ResourcesCatalog;
