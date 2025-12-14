import { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAdminActions } from "@/hooks/useAdminActions";

interface UploadPDFProps {
  type:
    | "question"
    | "result"
    | "instructions"
    | "instructionsHindi"
    | "howToParticipate";
  currentURL?: string;
}

const UploadPDF = ({ type, currentURL }: UploadPDFProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { uploadPDFOnly } = useAdminActions();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      await uploadPDFOnly(file, type, setProgress);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      setProgress(0);
      e.target.value = "";
    }
  };

  const label =
    type === "question"
      ? "Question Paper"
      : type === "instructions"
      ? "Exam Instructions"
      : type === "instructionsHindi"
      ? "Exam Instructions (Hindi)"
      : type === "howToParticipate"
      ? "How to Participate"
      : "Results";

  return (
    <Card className="p-4 h-full flex flex-col">
      <h3 className="font-semibold text-base mb-3 text-center">{label}</h3>

      {currentURL && (
        <div className="mb-3 p-2 bg-secondary rounded-lg flex items-center gap-2 min-h-0">
          <FileText className="h-4 w-4 text-primary flex-shrink-0" />
          <a
            href={currentURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline truncate"
          >
            Current PDF
          </a>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center">
        <label className="block">
          <Button
            variant="outline"
            className="w-full h-24 border-dashed cursor-pointer hover:border-primary hover:bg-secondary border-2"
            disabled={uploading}
            asChild
          >
            <div className="flex flex-col items-center justify-center gap-2 p-2">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
              {uploading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="text-xs text-center">
                    Uploading... {Math.round(progress)}%
                  </span>
                </>
              ) : (
                <>
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground text-center leading-tight">
                    Click to upload
                    <br />
                    PDF (max 10MB)
                  </span>
                </>
              )}
            </div>
          </Button>
        </label>

        {uploading && (
          <div className="mt-2">
            <Progress value={progress} className="w-full h-2" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default UploadPDF;
