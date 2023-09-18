// HelmetComponent.js
import React from 'react';
import { Helmet } from 'react-helmet';

function HelmetComponent({ pageTitle }) {
  return (
    <Helmet>
      <title>Todo Manager-{pageTitle}</title>
    </Helmet>
  );
}

export default HelmetComponent;
