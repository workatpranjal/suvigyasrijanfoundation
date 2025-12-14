import { useState, useEffect } from "react";
import { db } from "@/lib/supabase";

export interface ExamStatus {
  id?: string;
  phase: number; // 0: Not Started, 1: Registration Open, 2: Exam Day, 3: Results Published
  phaseLabel?: string;
  examDate: string;
  questionPaperURL?: string;
  instructionsURL?: string;
  instructionsHindiURL?: string;
  howToParticipateURL?: string;
  resultsURL?: string;
  announcement: string;
  updatedAt?: string;
  updatedBy?: string;
}

export const useExamStatus = () => {
  const [examStatus, setExamStatus] = useState<ExamStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let subscription: any;

    const fetchAndSubscribe = async () => {
      try {
        // Fetch initial data
        const { data, error: fetchError } = await db
          .from("exam_status")
          .select("*")
          .eq("id", "default")
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          throw fetchError;
        }

        if (data) {
          setExamStatus(data as ExamStatus);
        } else {
          // Default exam status if document doesn't exist
          setExamStatus({
            phase: 0,
            phaseLabel: "Not Started",
            examDate: new Date(
              Date.now() + 90 * 24 * 60 * 60 * 1000
            ).toISOString(),
            announcement: "Welcome! Exam details will be announced soon.",
          });
        }

        // Subscribe to realtime updates
        subscription = db
          .channel("exam_status_changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "exam_status",
              filter: "id=eq.default",
            },
            (payload) => {
              if (
                payload.eventType === "UPDATE" ||
                payload.eventType === "INSERT"
              ) {
                setExamStatus(payload.new as ExamStatus);
              }
            }
          )
          .subscribe();

        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching exam status:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAndSubscribe();

    return () => {
      if (subscription) {
        db.removeChannel(subscription);
      }
    };
  }, []);

  return { examStatus, loading, error };
};
