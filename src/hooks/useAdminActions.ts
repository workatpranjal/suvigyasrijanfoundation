import { auth, db } from "@/lib/supabase";
import { toast } from "sonner";

export const useAdminActions = () => {
  const updateExamStatus = async (updates: any) => {
    try {
      const {
        data: { user },
      } = await auth.getUser();
      if (!user) {
        throw new Error("Not authenticated");
      }

      // Filter out undefined values to avoid sending null to NOT NULL columns
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      );

      const { error } = await db.from("exam_status").upsert(
        {
          id: "default",
          ...cleanUpdates,
          updatedAt: new Date().toISOString(),
          updatedBy: user.id,
        },
        { onConflict: "id" }
      );

      if (error) throw error;

      toast.success("Exam status updated successfully");
    } catch (error: any) {
      console.error("Error updating exam status:", error);
      toast.error(error.message || "Failed to update exam status");
      throw error;
    }
  };

  const uploadPDF = async (
    file: File,
    type: "question" | "result" | "instructions",
    onProgress?: (progress: number) => void
  ): Promise<string> => {
    try {
      const {
        data: { user },
      } = await auth.getUser();
      if (!user) {
        throw new Error("Not authenticated");
      }

      const timestamp = Date.now();
      const fileName = `${type}_${timestamp}_${file.name}`;
      const filePath = `pdfs/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError, data } = await db.storage
        .from("suvigyasrijanfoundation")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = db.storage.from("suvigyasrijanfoundation").getPublicUrl(filePath);

      // Update exam status with the new URL
      const fieldName =
        type === "question"
          ? "questionPaperURL"
          : type === "instructions"
          ? "instructionsURL"
          : "resultsURL";
      await updateExamStatus({ [fieldName]: publicUrl });

      if (onProgress) onProgress(100);

      const successMessage =
        type === "question"
          ? "Question paper"
          : type === "instructions"
          ? "Instructions"
          : "Results";
      toast.success(`${successMessage} uploaded successfully`);
      return publicUrl;
    } catch (error: any) {
      console.error("Error uploading PDF:", error);
      toast.error(error.message || "Failed to upload PDF");
      throw error;
    }
  };

  const uploadPDFOnly = async (
    file: File,
    type:
      | "question"
      | "result"
      | "instructions"
      | "instructionsHindi"
      | "howToParticipate",
    onProgress?: (progress: number) => void
  ): Promise<string> => {
    try {
      const {
        data: { user },
      } = await auth.getUser();
      if (!user) {
        throw new Error("Not authenticated");
      }

      const timestamp = Date.now();
      const fileName = `${type}_${timestamp}_${file.name}`;
      const filePath = `pdfs/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError, data } = await db.storage
        .from("suvigyasrijanfoundation")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = db.storage.from("suvigyasrijanfoundation").getPublicUrl(filePath);

      // Update only the specific PDF URL field
      const fieldName =
        type === "question"
          ? "questionPaperURL"
          : type === "instructions"
          ? "instructionsURL"
          : type === "instructionsHindi"
          ? "instructionsHindiURL"
          : type === "howToParticipate"
          ? "howToParticipateURL"
          : "resultsURL";

      const { error } = await db.from("exam_status").upsert(
        {
          id: "default",
          [fieldName]: publicUrl,
          updatedAt: new Date().toISOString(),
          updatedBy: user.id,
        },
        { onConflict: "id" }
      );

      if (error) throw error;

      if (onProgress) onProgress(100);

      const successMessage =
        type === "question"
          ? "Question paper"
          : type === "instructions"
          ? "Instructions"
          : type === "instructionsHindi"
          ? "Instructions (Hindi)"
          : type === "howToParticipate"
          ? "How to Participate guide"
          : "Results";
      toast.success(`${successMessage} uploaded successfully`);
      return publicUrl;
    } catch (error: any) {
      console.error("Error uploading PDF:", error);
      toast.error(error.message || "Failed to upload PDF");
      throw error;
    }
  };

  return {
    updateExamStatus,
    uploadPDF,
    uploadPDFOnly,
  };
};
