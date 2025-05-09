import React from "react";
import CardWrapper from "./card-wrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="dont have an account?"
      showSocial
      backButtonHref="/auth/register"
    >
      LoginForm
    </CardWrapper>
  );
};

export default LoginForm;
