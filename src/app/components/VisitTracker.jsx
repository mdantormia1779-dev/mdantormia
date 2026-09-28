"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // ব্যাকএন্ডের API রিকোয়েস্ট
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/visits`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Visit tracking failed:", error);
      }
    };

    trackVisit();
  }, []);

  return null; // এটি UI তে কিছুই দেখাবে না
}