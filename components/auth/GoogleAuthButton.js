import { signIn, signOut, useSession } from "next-auth/client";
import React from "react";

const GoogleAuthButton = () => {
  const [session, loading] = useSession()

  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          signIn('google', {callbackUrl: "/studio-entry"});
        }}
        className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
      >
        Sign In with Google
      </button>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          signOut({ callbackUrl: '/', redirect: true });
        }}
        className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
      >
        Sign Out
      </button>
    );
  };

  if (!session) {
    return (
      <div>
        {signOutButtonNode()}
        {signInButtonNode()}
      </div>
    );
  }

  return (
    <div>
      {signOutButtonNode()}
      {signInButtonNode()}
    </div>
  );
};

export default GoogleAuthButton;
