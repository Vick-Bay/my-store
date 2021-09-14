import React from "react";

import SignIn from "../sign-in/sign-in.component";
import SignUp from "../sign-up/sign-up.component";

import { SignInAndSignUpContainer } from "./sign-in-and-sign-up.styles";

const SignInAndSignUpPage = () => (
  <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>
);
export default SignInAndSignUpPage;
