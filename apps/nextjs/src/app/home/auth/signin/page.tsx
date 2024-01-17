import { CardWrapper } from "~/components/auth/card-wrapper";
import { SignInForm } from "~/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <main>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="No account?"
        backButtonLinkLabel="Sign up"
        backButtonHref="/auth/signup"
        showSocial
      >
        <SignInForm />
      </CardWrapper>
    </main>
  );
}
