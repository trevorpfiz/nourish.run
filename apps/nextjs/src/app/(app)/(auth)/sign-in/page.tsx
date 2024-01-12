import { CardWrapper } from "~/app/(app)/(auth)/_components/card-wrapper";
import { SignInForm } from "~/app/(app)/(auth)/_components/sign-in-form";

export default function SignInPage() {
  return (
    <main>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="No account?"
        backButtonLinkLabel="Sign up"
        backButtonHref="/sign-up"
        showSocial
      >
        <SignInForm />
      </CardWrapper>
    </main>
  );
}
