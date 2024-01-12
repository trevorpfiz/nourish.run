import { CardWrapper } from "~/app/(app)/(auth)/_components/card-wrapper";
import { SignUpForm } from "~/app/(app)/(auth)/_components/sign-up-form";

export default function SignUpPage() {
  return (
    <main>
      <CardWrapper
        headerLabel="Create your account"
        backButtonLabel="Have an account?"
        backButtonLinkLabel="Sign in"
        backButtonHref="/sign-in"
        showSocial
      >
        <SignUpForm />
      </CardWrapper>
    </main>
  );
}
