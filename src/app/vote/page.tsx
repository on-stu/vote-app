"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";

export default function VotePage() {
  const [loading, setLoading] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  async function submitVote(value: "yes" | "no") {
    setLoading(true);

    try {
      // Get the current vote record (we only have one row)
      const { data, error: fetchError } = await supabase
        .from("votes")
        .select("*")
        .limit(1)
        .single();

      if (fetchError) {
        console.error("Error fetching vote record:", fetchError);
        return;
      }

      // Update the appropriate counter
      const updates =
        value === "yes"
          ? { yes_count: (data.yes_count || 0) + 1 }
          : { no_count: (data.no_count || 0) + 1 };

      // Update the record
      const { error: updateError } = await supabase
        .from("votes")
        .update(updates)
        .eq("id", data.id);

      if (updateError) {
        console.error("Error updating vote:", updateError);
        return;
      }

      // Show success message and redirect after a short delay
      setVoteSubmitted(true);
    } catch (error) {
      console.error("Error during vote submission:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="py-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">투표 하기</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          캘린더 서비스를 사용해본 경험이 있으신가요?
        </p>
      </header>

      <main className="flex flex-col items-center justify-center gap-10">
        {voteSubmitted ? (
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
              투표해주셔서 감사합니다!
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              앱티브 1팀 솔티드 였습니다!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full max-w-md">
            <button
              onClick={() => submitVote("yes")}
              disabled={loading}
              className="py-6 px-8 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Yes
            </button>

            <button
              onClick={() => submitVote("no")}
              disabled={loading}
              className="py-6 px-8 bg-red-500 hover:bg-red-600 text-white font-bold text-xl rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              No
            </button>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        앱티브 1팀 솔티드!
      </footer>
    </div>
  );
}
