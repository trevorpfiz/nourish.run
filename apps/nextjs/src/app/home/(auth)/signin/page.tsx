import { CardWrapper } from "~/app/home/(auth)/_components/card-wrapper";
import { SignInForm } from "~/app/home/(auth)/_components/sign-in-form";

export default function SignInPage() {
  return (
    <main>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="No account?"
        backButtonLinkLabel="Sign up"
        backButtonHref="/signup"
        showSocial
      >
        <SignInForm />
      </CardWrapper>
    </main>
  );
}
