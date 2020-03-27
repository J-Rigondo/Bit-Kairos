import React from 'react';
import { PageTemplate, Background } from 'components';
import { HeaderContainer, RegisterFormContainer } from 'containers';

const RegisterPage = () => {
  return (
    <>
      <PageTemplate header={<HeaderContainer />}>
        <Background register />
        <RegisterFormContainer />
      </PageTemplate>
    </>
  );
};

export default RegisterPage;
