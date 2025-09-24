import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SignIn } from '@/components/ui/sign-in';
import { useMember } from '../../../integrations/index.js';

export function MemberProtectedRoute({
  children,
  messageToSignIn = "Please sign in to access this page.",
  messageToLoading = "Loading page...",
  signInTitle = "Sign In Required",
  signInClassName = "",
  loadingClassName = "",
  signInProps = {},
  loadingSpinnerProps = {}
}) {
  const { isAuthenticated, isLoading } = useMember();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <LoadingSpinner
          message={messageToLoading}
          className={loadingClassName}
          {...loadingSpinnerProps}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <SignIn
          title={signInTitle}
          message={messageToSignIn}
          className={signInClassName}
          {...signInProps}
        />
      </div>
    );
  }

  return <>{children}</>;
}
