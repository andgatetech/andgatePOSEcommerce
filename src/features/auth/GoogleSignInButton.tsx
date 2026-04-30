"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setCredentials } from "@/features/auth/authSlice";
import { saveStoredAuth } from "@/features/auth/authStorage";
import { useGoogleAuthMutation } from "@/features/api/authApi";
import { useAppDispatch } from "@/lib/hooks";
import type { ApiResponse, AuthData } from "@/types";

type GoogleCredentialResponse = {
  credential?: string;
  select_by?: string;
};

type GoogleButtonText = "signin_with" | "signup_with" | "continue_with";
type GoogleCredentialCallback = (response: GoogleCredentialResponse) => void;

let initializedGoogleClientId: string | null = null;
let activeGoogleCredentialCallback: GoogleCredentialCallback | null = null;

type GoogleSignInButtonProps = {
  intent: "login" | "register";
  acceptedTerms?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  text?: GoogleButtonText;
  onAuthenticated: (authData: AuthData) => void;
  onAccountNotFound?: () => void;
  onError: (message: string) => void;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type: "standard";
              theme: "outline";
              size: "large";
              text: GoogleButtonText;
              shape: "rectangular";
              logo_alignment: "left";
              width: number;
            },
          ) => void;
        };
      };
    };
  }
}

function getGoogleErrorMessage(error: unknown) {
  const apiError = error as FetchBaseQueryError & {
    data?: ApiResponse<null>;
  };

  if (apiError?.data?.errors) {
    const firstError = Object.values(apiError.data.errors).flat()[0];
    if (firstError) {
      return firstError;
    }
  }

  if (apiError?.data?.message) {
    return apiError.data.message;
  }

  return "Google sign-in failed. Please try again.";
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function initializeGoogleIdentity(clientId: string) {
  if (!window.google || initializedGoogleClientId === clientId) {
    return;
  }

  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: (response) => {
      activeGoogleCredentialCallback?.(response);
    },
  });
  initializedGoogleClientId = clientId;
}

export default function GoogleSignInButton({
  intent,
  acceptedTerms = false,
  disabled = false,
  disabledMessage = "Google sign-in is not available right now.",
  text = "continue_with",
  onAuthenticated,
  onAccountNotFound,
  onError,
}: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const handleGoogleResponseRef = useRef<GoogleCredentialCallback | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(320);
  const [googleAuth, { isLoading }] = useGoogleAuthMutation();
  const dispatch = useAppDispatch();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const isConfigured = Boolean(clientId);
  const isUnavailable = isLoading || !isConfigured;

  const handleGoogleResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      if (isUnavailable || disabled) {
        onError(!isConfigured ? "Google sign-in is not configured." : disabledMessage);
        return;
      }

      if (!response.credential) {
        onError("Google did not return a sign-in credential.");
        return;
      }

      try {
        const result = await googleAuth({
          credential: response.credential,
          intent,
          ...(intent === "register" && acceptedTerms ? { accepted_terms: true } : {}),
        }).unwrap();

        const authData = result.data;
        saveStoredAuth(authData);
        dispatch(setCredentials(authData));
        onAuthenticated(authData);
      } catch (error) {
        if ((error as FetchBaseQueryError)?.status === 404 && onAccountNotFound) {
          onAccountNotFound();
          return;
        }

        onError(getGoogleErrorMessage(error));
      }
    },
    [
      acceptedTerms,
      disabledMessage,
      dispatch,
      googleAuth,
      intent,
      isConfigured,
      isUnavailable,
      onAccountNotFound,
      onAuthenticated,
      onError,
      disabled,
    ],
  );

  useEffect(() => {
    handleGoogleResponseRef.current = handleGoogleResponse;
  }, [handleGoogleResponse]);

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const width = Math.floor(entry.contentRect.width);
      setButtonWidth(Math.max(220, Math.min(width, 400)));
    });

    observer.observe(buttonRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isUnavailable || disabled || !clientId || !buttonRef.current || !window.google || !scriptReady) {
      return;
    }

    const credentialCallback: GoogleCredentialCallback = (response) => {
      handleGoogleResponseRef.current?.(response);
    };

    activeGoogleCredentialCallback = credentialCallback;
    buttonRef.current.innerHTML = "";
    initializeGoogleIdentity(clientId);
    window.google.accounts.id.renderButton(buttonRef.current, {
      type: "standard",
      theme: "outline",
      size: "large",
      text,
      shape: "rectangular",
      logo_alignment: "left",
      width: buttonWidth,
    });

    return () => {
      if (activeGoogleCredentialCallback === credentialCallback) {
        activeGoogleCredentialCallback = null;
      }
    };
  }, [buttonWidth, clientId, disabled, isUnavailable, scriptReady, text]);

  if (isUnavailable) {
    return (
      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-(--color-border) bg-white py-3 font-medium text-(--color-text-muted) opacity-70"
        aria-label={!isConfigured ? "Google sign-in is not configured" : disabledMessage}
      >
        <GoogleMark />
        Continue with Google
      </button>
    );
  }

  if (disabled) {
    return (
      <button
        type="button"
        onClick={() => onError(disabledMessage)}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-(--color-border) bg-white py-3 font-medium text-(--color-text) transition hover:bg-gray-50"
      >
        <GoogleMark />
        Continue with Google
      </button>
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
      />
      <div ref={buttonRef} className="flex w-full min-h-[44px] items-center justify-center" />
    </>
  );
}
