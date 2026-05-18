import type { Metadata } from "next";
import OfflineView from "./OfflineView";

export const metadata: Metadata = { title: "You're Offline" };

export default function OfflinePage() {
  return <OfflineView />;
}
