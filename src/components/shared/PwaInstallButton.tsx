"use client";

import { useEffect, useState } from "react";
import { FiDownload, FiX } from "react-icons/fi";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandalone() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator &&
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

export default function PwaInstallButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setDismissed(false);
    };

    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setInstalled(true);
    }
    setInstallPrompt(null);
  }

  if (!installPrompt || dismissed || installed) return null;

  return (
    <div className="fixed bottom-[82px] right-4 z-40 flex items-center gap-2 rounded-full border border-(--color-border) bg-white p-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.18)] xl:bottom-6">
      <button
        type="button"
        onClick={handleInstall}
        className="inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-(--color-primary-dark)"
      >
        <FiDownload className="text-[16px]" />
        Install App
      </button>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss install app button"
        className="flex h-9 w-9 items-center justify-center rounded-full text-(--color-text-muted) transition hover:bg-(--color-primary-50) hover:text-(--color-primary-900)"
      >
        <FiX className="text-[16px]" />
      </button>
    </div>
  );
}
