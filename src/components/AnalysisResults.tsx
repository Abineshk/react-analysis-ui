import { useState } from "react";
import RadialHealthChart from "../charts/RadialHealthChart";
import StatusBarChart from "../charts/StatusBarChart";
import { ItemsList } from "./ItemsList";
import { PdfContainer } from "./pdf/PdfContainer";
import ChartContainer from "./reusable/ChartContainer";
import StatCard from "./StatCard";
import { TabsPanel } from "./TabsPanel";

interface AnalysisResultsProps {
  pdfFile: File | null;
}

const radialData = [{ name: "Score", value: 75, fill: "#00a63e" }];

const statusData = [
  { name: "Compliant", value: 150, fill: "#00a63e" },
  { name: "Non Compliant", value: 50, fill: "#e7000b" },
];

const analysisData = {
  results: [
    {
      id: 1,
      is_present: "Yes",
      confidence: 100,
      obligation: "fgsoifho9ws8 fb 9wh9gfu haewgnuwaeu 9guujhwe 9og",
      similarity_score: 50,
      keyword_hits: ["sam", "sam", "Sfsf"],
      reason: "dsmsfbowrf 0jifj 0j wrf-9j w9fj",
      suggestion: "sfihn sofin sfih0ish fihf ihfn",
      supporting_clauses: [
        `Confidential Information” does not include (a) information that is or becomes public, (b)
feedback voluntarily provided by the Client, or (c) residual knowledge retained in unaided
memory.`,
        `term`,
        `intellectual`,
      ],
    },
    {
      id: 2,
      is_present: "Yes",
      confidence: 100,
      obligation: "fgsoifho9ws8 fb 9wh9gfu haewgnuwaeu 9guujhwe 9og",
      similarity_score: 50,
      keyword_hits: ["sam", "sam", "Sfsf"],
      reason: "dsmsfbowrf 0jifj 0j wrf-9j w9fj",
      supporting_clauses: [
        "sfsf wrffwsfwsfwf",
        "Afsfsfgwgf sfw fwsfw wrf wrfw rf",
        "afsafsfwffsa",
      ],
    },
    {
      id: 3,
      is_present: "No",
      confidence: 100,
      obligation: "fgsoifho9ws8 fb 9wh9gfu haewgnuwaeu 9guujhwe 9og",
      similarity_score: 50,
      keyword_hits: ["sam", "sam", "Sfsf"],
      reason: "dsmsfbowrf 0jifj 0j wrf-9j w9fj",
      supporting_clauses: [
        "sfsf wrffwsfwsfwf",
        "Afsfsfgwgf sfw fwsfw wrf wrfw rf",
        "afsafsfwffsa",
      ],
    },
    {
      id: 4,
      is_present: "Yes",
      confidence: 100,
      obligation: "fgsoifho9ws8 fb 9wh9gfu haewgnuwaeu 9guujhwe 9og",
      similarity_score: 50,
      keyword_hits: ["sam", "sam", "Sfsf"],
      reason: "dsmsfbowrf 0jifj 0j wrf-9j w9fj",
      supporting_clauses: [
        "sfsf wrffwsfwsfwf",
        "Afsfsfgwgf sfw fwsfw wrf wrfw rf",
        "afsafsfwffsa",
      ],
    },
    {
      id: 5,
      is_present: "No",
      confidence: 100,
      obligation: "fgsoifho9ws8 fb 9wh9gfu haewgnuwaeu 9guujhwe 9og",
      similarity_score: 50,
      keyword_hits: ["sam", "sam", "Sfsf"],
      reason: "dsmsfbowrf 0jifj 0j wrf-9j w9fj",
      supporting_clauses: [
        "sfsf wrffwsfwsfwf",
        "Afsfsfgwgf sfw fwsfw wrf wrfw rf",
        "afsafsfwffsa",
      ],
    },
    {
      id: 6,
      is_present: "No",
      confidence: 100,
      obligation: "fgsoifho9ws8 fb 9wh9gfu haewgnuwaeu 9guujhwe 9og",
      similarity_score: 50,
      keyword_hits: ["sam", "sam", "Sfsf"],
      reason: "dsmsfbowrf 0jifj 0j wrf-9j w9fj",
      supporting_clauses: [
        "sfsf wrffwsfwsfwf",
        "Afsfsfgwgf sfw fwsfw wrf wrfw rf",
        "afsafsfwffsa",
      ],
    },
  ],
};

export function AnalysisResults({ pdfFile }: AnalysisResultsProps) {
  const [selectedObligation, setSelectedObligation] = useState<null | {}>(null);
  const [selectedClause, setSelectedClause] = useState("");

  const handleChangeObligation = (obligation: any) => {
    setSelectedObligation(obligation);
    setSelectedClause("");
  };

  return (
    <div className="mb-20">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-2xl">
            Analysis Results
          </span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm cursor-pointer">
              Export Report
            </button>
            <button
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm cursor-pointer"
              onClick={() => print()}
            >
              Print
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Obligations"
            value={200}
            fromColor="from-purple-500"
            toColor="to-purple-600"
            labelColor="text-purple-100"
            icon="📊"
          />
          <StatCard
            label="Compliant Items"
            value={150}
            fromColor="from-green-500"
            toColor="to-green-600"
            labelColor="text-green-100"
            icon="✓"
          />
          <StatCard
            label="Non Compliant Items"
            value={50}
            fromColor="from-red-500"
            toColor="to-red-600"
            labelColor="text-red-100"
            icon="⚠"
          />
          <StatCard
            label="Processing Time"
            value="3.2s"
            fromColor="from-blue-500"
            toColor="to-blue-600"
            labelColor="text-blue-100"
            icon="⚡"
          />
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartContainer title="Overall Health">
            <RadialHealthChart value={75} radialData={radialData} />
          </ChartContainer>

          <ChartContainer title="Compliance Status Distribution">
            <StatusBarChart data={statusData} />
          </ChartContainer>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Items List */}
          <div className="lg:col-span-3">
            <ItemsList
              handleChangeObligation={handleChangeObligation}
              analysisData={analysisData}
              selectedObligation={selectedObligation}
            />
          </div>

          {/* Center: PDF Viewer */}
          <div className="lg:col-span-5">
            <PdfContainer file={pdfFile} selectedClause={selectedClause} />
          </div>

          {/* Right: Tabs Panel */}
          <div className="lg:col-span-4">
            <TabsPanel
              selectedObligation={selectedObligation}
              selectedClause={selectedClause}
              setSelectedClause={setSelectedClause}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
