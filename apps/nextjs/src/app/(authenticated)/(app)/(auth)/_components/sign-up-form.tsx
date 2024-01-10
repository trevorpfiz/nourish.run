import { CardWrapper } from "~/app/(authenticated)/(app)/(auth)/_components/card-wrapper";

export const SignUpForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/sign-in"
      showSocial
    >
      Hello, Sign Up Form!
    </CardWrapper>
  );
};
