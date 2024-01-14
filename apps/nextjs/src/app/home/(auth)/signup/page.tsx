import { CardWrapper } from "~/app/home/(auth)/_components/card-wrapper";
import { SignUpForm } from "~/app/home/(auth)/_components/sign-up-form";

export default function SignUpPage() {
  return (
    <main>
      <CardWrapper
        headerLabel="Create your account"
        backButtonLabel="Have an account?"
        backButtonLinkLabel="Sign in"
        backButtonHref="/signin"
        showSocial
      >
        <SignUpForm />
      </CardWrapper>
    </main>
  );
}
