import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Legend,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ItemsList } from "./ItemsList";
import { TabsPanel } from "./TabsPanel";
import { PdfViewer } from "./pdf/PdfViewer";

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
          <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-100 text-sm">Total Obligations</span>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <p className="text-3xl">200</p>
          </div>

          <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-100 text-sm">Compliant Items</span>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
            <p className="text-3xl">150</p>
          </div>

          <div className="bg-linear-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-100 text-sm">Errors Found</span>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚠</span>
              </div>
            </div>
            <p className="text-3xl">50</p>
          </div>

          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100 text-sm">Processing Time</span>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
            <p className="text-3xl">3.2s</p>
          </div>
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-linear-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 min-h-[300px] flex items-center justify-center shadow-md hover:shadow-xl transition-shadow">
            <div className="w-full h-full">
              <span className="text-xl text-purple-600">Overall Health</span>
              <div
                id="chart-1"
                className="h-[200px] relative hover:scale-105 transition-all duration-300"
              >
                {/* Center Text */}
                <div className="absolute flex items-center justify-center w-full h-full">
                  <span className="text-3xl font-semibold text-gray-800">
                    75%
                  </span>
                </div>

                {/* Center Text */}
                <div className="absolute flex items-center justify-center w-full h-75">
                  <span className="text-xl font-semibold text-gray-800">
                    Score
                  </span>
                </div>

                <ResponsiveContainer>
                  <RadialBarChart
                    cx="50%"
                    cy="60%"
                    innerRadius="80%"
                    barSize={20}
                    data={radialData}
                    startAngle={180}
                    endAngle={0}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]} // Full scale
                      angleAxisId={0}
                      tick={false}
                    />
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={5}
                      isAnimationActive={true} // enable animation
                      animationDuration={3000}
                    />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 min-h-[300px] flex items-center justify-center shadow-md hover:shadow-xl transition-shadow">
            <div className="w-full h-full">
              <span className="text-xl text-purple-600">
                Compliance Status Distribution
              </span>
              <div
                id="chart-1"
                className="w-full h-[200px] hover:scale-105 hover:bg-white/40 transition-all duration-300 mt-2"
              >
                <ResponsiveContainer>
                  <BarChart
                    data={statusData}
                    layout="vertical" // left → right
                    margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                  >
                    {/* X-axis shows percentages */}
                    <XAxis type="number" hide />

                    {/* Y-axis shows Pass / Fail */}
                    <YAxis
                      type="category"
                      dataKey="name"
                      tickLine={false}
                      tick={false}
                      mirror
                    />

                    <Tooltip cursor={{ fill: "#f1f5f9" }} />

                    <Bar
                      dataKey="value"
                      barSize={25}
                      radius={[0, 10, 10, 0]}
                      isAnimationActive={true} // enable animation
                      animationDuration={3000}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}

                      {/* Center Text */}
                      <LabelList
                        dataKey="value"
                        position="center"
                        formatter={(value: string) => `${value}`}
                        fill="#fff"
                        fontSize={12}
                      />
                    </Bar>

                    {/* Custom Legend */}
                    <Legend
                      verticalAlign="bottom"
                      height={40}
                      payload={statusData.map((data) => ({
                        color: data.fill,
                        value: data.name,
                        type: "circle",
                      }))}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
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
            <PdfViewer file={pdfFile} selectedClause={selectedClause} />
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
