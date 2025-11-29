import { useState } from "react";
import { AnalysisResults } from "../components/AnalysisResults";
import { FileUpload } from "../components/FileUpload";
import { ProgressBar } from "../components/reusable/ProgressBar";

export const Home = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false); // Set to true to show dummy data

  const handleAnalyze = () => {
    if (!excelFile || !pdfFile) {
      alert("Please upload both Excel and PDF files");
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setShowResults(false);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowResults(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleReset = () => {
    setExcelFile(null);
    setPdfFile(null);
    setIsAnalyzing(false);
    setProgress(0);
    setShowResults(false);
  };
  return (
    <div>
      {/* Progress Bar */}
      {isAnalyzing && <ProgressBar progress={progress} />}

      {/* Upload Section */}
      <div className="">
        <FileUpload
          excelFile={excelFile}
          pdfFile={pdfFile}
          onExcelUpload={setExcelFile}
          onPdfUpload={setPdfFile}
          onAnalyze={handleAnalyze}
          onReset={handleReset}
          isAnalyzing={isAnalyzing}
          showResults={showResults}
        />
      </div>

      {/* Analysis Results */}
      {!isAnalyzing && showResults && (
        <div className="mt-8">
          <AnalysisResults pdfFile={pdfFile} />
        </div>
      )}
    </div>
  );
};
