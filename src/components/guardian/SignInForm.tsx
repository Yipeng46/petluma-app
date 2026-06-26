"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createAuthBrowserClient } from "@/lib/supabase/auth-browser";
import { isValidEmail } from "@/lib/pet-identity";

type AuthMode = "sign-in" | "sign-up";

async function syncGuardianProfile() {
  await fetch("/api/guardian/sync-profile", { method: "POST" });
}

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/my-kingdom";

  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (mode === "sign-up" && password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const supabase = createAuthBrowserClient();

    if (!supabase) {
      setErrorMessage("Sign in is unavailable right now. Please try again later.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "sign-in") {
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        await syncGuardianProfile();
        router.push(nextPath);
        router.refresh();
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
      });

      if (error) {
        if (/already registered|already exists/i.test(error.message)) {
          setErrorMessage(
            "This Guardian email already exists. Sign in instead, or use password reset if you registered a companion first.",
          );
        } else {
          setErrorMessage(error.message);
        }
        return;
      }

      if (data.session) {
        await syncGuardianProfile();
        router.push(nextPath);
        router.refresh();
        return;
      }

      setStatusMessage(
        "Guardian access created. Check your email to confirm, then return here to enter My Kingdom.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="guardian-auth">
      <div className="guardian-auth__tabs" role="tablist" aria-label="Guardian access">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "sign-in"}
          className={`guardian-auth__tab${mode === "sign-in" ? " guardian-auth__tab--active" : ""}`}
          onClick={() => {
            setMode("sign-in");
            setErrorMessage(null);
            setStatusMessage(null);
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "sign-up"}
          className={`guardian-auth__tab${mode === "sign-up" ? " guardian-auth__tab--active" : ""}`}
          onClick={() => {
            setMode("sign-up");
            setErrorMessage(null);
            setStatusMessage(null);
          }}
        >
          Create Access
        </button>
      </div>

      <form className="guardian-auth__form" onSubmit={handleSubmit}>
        <label className="guardian-auth__field">
          <span className="guardian-auth__label">Guardian Email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="guardian-auth__input"
            required
          />
        </label>

        <label className="guardian-auth__field">
          <span className="guardian-auth__label">Password</span>
          <input
            type="password"
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="guardian-auth__input"
            required
            minLength={8}
          />
        </label>

        {mode === "sign-up" ? (
          <label className="guardian-auth__field">
            <span className="guardian-auth__label">Confirm Password</span>
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="guardian-auth__input"
              required
              minLength={8}
            />
          </label>
        ) : null}

        {errorMessage ? <p className="guardian-auth__message guardian-auth__message--error">{errorMessage}</p> : null}
        {statusMessage ? (
          <p className="guardian-auth__message guardian-auth__message--status">{statusMessage}</p>
        ) : null}

        <button type="submit" className="guardian-auth__submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Please wait…"
            : mode === "sign-in"
              ? "Enter My Kingdom"
              : "Create Guardian Access"}
        </button>
      </form>

      {mode === "sign-in" ? (
        <p className="guardian-auth__note">
          Registered a companion with your email? Switch to{" "}
          <button
            type="button"
            className="guardian-auth__inline-link"
            onClick={() => {
              setMode("sign-up");
              setErrorMessage(null);
              setStatusMessage(null);
            }}
          >
            Create Access
          </button>{" "}
          to set your password, or use password reset if access already exists.
        </p>
      ) : (
        <p className="guardian-auth__note">
          Future sign-in methods reserved for Magic Link, Google, and Apple.
        </p>
      )}
    </div>
  );
}
