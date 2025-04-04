"use client";

import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { supabase, VoteCount } from "@/utils/supabase";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the vote row structure from the database
interface VoteRow {
  id: number;
  yes_count: number;
  no_count: number;
}

export default function VoteChart() {
  const [voteCount, setVoteCount] = useState<VoteCount>({ yes: 0, no: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch initial vote counts
    const fetchVoteCounts = async () => {
      try {
        const { data, error } = await supabase
          .from("votes")
          .select("*")
          .limit(1)
          .single();

        if (error) {
          console.error("Error fetching votes:", error);
          return;
        }

        if (data) {
          setVoteCount({ yes: data.yes_count || 0, no: data.no_count || 0 });
        }
      } catch (error) {
        console.error("Error fetching vote counts:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch initial data
    fetchVoteCounts();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel("votes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "votes",
        },
        (payload) => {
          const newData = payload.new as VoteRow;
          setVoteCount({
            yes: newData.yes_count || 0,
            no: newData.no_count || 0,
          });
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Chart data
  const data = {
    labels: ["Yes", "No"],
    datasets: [
      {
        data: [voteCount.yes, voteCount.no],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderColor: ["#388E3C", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  if (loading) {
    return <div className="text-center p-8">Loading vote data...</div>;
  }

  const total = voteCount.yes + voteCount.no;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center">투표 결과</h2>

      <div className="w-full max-w-xs">
        <Pie data={data} options={options} />
      </div>

      <div className="w-full grid grid-cols-2 gap-4 text-center">
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <div className="text-3xl font-bold text-green-600 dark:text-green-300">
            {voteCount.yes}
          </div>
          <div className="text-sm text-green-800 dark:text-green-200">YES</div>
          <div className="text-xs mt-1">
            {total > 0 ? `${Math.round((voteCount.yes / total) * 100)}%` : "0%"}
          </div>
        </div>

        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <div className="text-3xl font-bold text-red-600 dark:text-red-300">
            {voteCount.no}
          </div>
          <div className="text-sm text-red-800 dark:text-red-200">NO</div>
          <div className="text-xs mt-1">
            {total > 0 ? `${Math.round((voteCount.no / total) * 100)}%` : "0%"}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        총 투표수: {total}
      </div>
    </div>
  );
}
