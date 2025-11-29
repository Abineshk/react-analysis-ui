import { CheckCircle, Cpu, FileX, Lightbulb } from "lucide-react";
import { useState } from "react";
import RadialHealthChart from "../charts/RadialHealthChart";
import StatusBarChart from "../charts/StatusBarChart";
import { ItemsList } from "./ItemsList";
import { PdfContainer } from "./pdf/PdfContainer";
import ChartContainer from "./reusable/ChartContainer";
import SearchBox from "./reusable/SearchBox";
import StatCard from "./StatCard";
import { StatusBadge } from "./StatusBadge";
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
  const [selectedObligation, setSelectedObligation] = useState<
    null | (typeof analysisData.results)[0]
  >(null);
  const [selectedClause, setSelectedClause] = useState("");

  const handleChangeObligation = (obligation: any) => {
    setSelectedObligation(obligation);
    setSelectedClause("");
  };

  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState("details");
  // const [selectedClause, setSelectedClause] = useState(null);

  const toggleItem = (id: any) => {
    setOpenItemId((openItemId) => (openItemId === id ? null : id));
    setSelectedTab("details"); // reset tab when switching items
  };

  const handleChangeTab = (tab: string) => {
    setSelectedTab(tab);
    setSelectedClause("");
  };

  const getScoreContent = (score: number) => {
    if (score > 75) return { color: "text-red-600", text: "Bad" };
    if (score > 50) return { color: "text-red-600", text: "Average" };
    return { color: "text-green-600", text: "Good" };
  };

  const scoreContent = getScoreContent(93);

  const changeClause = (clause: string) => {
    setSelectedClause(clause);
  };

  const [searchText, setSearchText] = useState("");

  const filterAnalysisResultsData = analysisData.results.filter((res: any) =>
    res?.obligation?.toLowerCase().includes(searchText?.toLowerCase() || "")
  );

  return (
    <div>
      <div className="pt-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5">
          {/* LEFT PANEL: Accordion + Tabs */}
          <div className="lg:col-span-5">
            <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl p-4 h-[600px] flex flex-col shadow-lg">
              {/* Header */}
              <div className="mb-4 pb-3 border-b border-purple-200">
                <span className="text-gray-900 text-lg font-medium">
                  Obligations
                </span>
              </div>

              {/* Filter/Search Section */}
              <div className="mb-3">
                <SearchBox
                  searchText={searchText}
                  setSearchText={setSearchText}
                />
              </div>

              {/* Scrollable Content */}
              <div
                className="flex-1 overflow-y-auto space-y-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#A100FF #f0f0f0",
                }}
              >
                {filterAnalysisResultsData?.length > 0 ? (
                  filterAnalysisResultsData.map((item) => (
                    <div
                      key={item.id}
                      className="p-1 border-b border-purple-200 rounded-md"
                    >
                      {/* Item Header */}
                      <button
                        onClick={() => {
                          toggleItem(item.id);
                          handleChangeObligation(item);
                        }}
                        className={`w-full p-2 cursor-pointer text-left transition-colors rounded-md ${
                          openItemId === item.id
                            ? "bg-indigo-50 border-b border-indigo-600"
                            : "hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <StatusBadge status={item.is_present} />
                            <span className="text-md text-slate-600 font-mono ml-4">
                              ID: {item.id}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-[12px] pr-3 font-medium text-slate-600">
                              {item.confidence}%
                            </span>
                            <svg
                              className={`h-6 w-6 text-gray-600 transform transition-transform duration-300 ${
                                openItemId === item.id ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        <p
                          className={`text-md mt-2 ${
                            openItemId === item.id
                              ? "text-indigo-900 font-medium"
                              : "text-slate-600 font-normal"
                          }`}
                        >
                          {item.obligation}
                        </p>
                      </button>

                      {/* Accordion Content */}
                      <div
                        className={`transition-all duration-500 ease-in-out ${
                          openItemId === item.id
                            ? "max-h-[600px] p-3"
                            : "max-h-0 p-0"
                        } overflow-hidden bg-gray-50`}
                      >
                        {/* Tabs */}
                        {/* <div className="flex gap-4 mb-4 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
                          {["details", "evidence", "suggestion"].map((tab) => (
                            <button
                              key={tab}
                              className={`pb-2 text-sm font-medium transition-colors cursor-pointer ${
                                selectedTab === tab
                                  ? "border-b-2 border-purple-600 text-purple-600"
                                  : "border-b-2 border-transparent text-gray-600 hover:text-purple-600 hover:border-purple-300"
                              }`}
                              onClick={() => handleChangeTab(tab)}
                            >
                              {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                          ))}
                        </div> */}

                        {/* New Tabs */}
                        <div className="flex gap-1 mb-4 bg-purple-100 rounded-lg p-1 mt-1">
                          {["details", "evidence", "suggestion"].map((tab) => (
                            <button
                              key={tab}
                              className={`flex-1 px-4 py-2 rounded-lg transition-all relative cursor-pointer ${
                                selectedTab === tab
                                  ? "bg-white text-purple-600 shadow-md"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-purple-100"
                              }`}
                              onClick={() => handleChangeTab(tab)}
                            >
                              {tab.charAt(0).toUpperCase() + tab.slice(1)}
                              {tab === "suggestion" && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white rounded-full text-xs flex items-center justify-center">
                                  1
                                </span>
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Tab Content */}
                        {selectedTab === "details" && (
                          <div className="space-y-4 fade-in">
                            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 shadow-sm">
                              <span className="text-xs font-bold text-indigo-600 uppercase mb-2 flex items-center gap-2">
                                <Cpu size={14} /> Analysis Reasoning
                              </span>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {selectedObligation?.reason}
                              </p>
                            </div>

                            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 shadow-sm">
                              <span className="text-gray-900 mb-2">
                                Similarity Score
                              </span>
                              <div className="mb-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span
                                    className="text-2xl"
                                    style={{ color: "#A100FF" }}
                                  >
                                    93.8%
                                  </span>
                                  <span
                                    className={`text-sm ${scoreContent.color}`}
                                  >
                                    {scoreContent.text}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="h-2 rounded-full"
                                    style={{
                                      width: "93.8%",
                                      backgroundColor: "#A100FF",
                                    }}
                                  />
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm">
                                Overall similarity is {scoreContent.text} with a
                                high accuracy rate.
                              </p>
                            </div>

                            <span className="text-gray-900 mb-2 p-3 flex justify-between">
                              <span>Keywords Matched</span>
                              <span>
                                {selectedObligation?.keyword_hits.length}
                              </span>
                            </span>
                          </div>
                        )}

                        {selectedTab === "evidence" && (
                          <div className="space-y-4 fade-in">
                            {selectedObligation &&
                            selectedObligation?.supporting_clauses?.length >
                              0 ? (
                              selectedObligation.supporting_clauses.map(
                                (clause, i) => (
                                  <button
                                    key={i}
                                    onClick={() => changeClause(clause)}
                                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 block w-full
                          ${
                            selectedClause === clause
                              ? "bg-white border-l-4 border-green-500 shadow-lg"
                              : "bg-white/70 hover:bg-white hover:shadow-md border-l-4 border-indigo-300 hover:border-indigo-500"
                          }`}
                                  >
                                    <div className="flex justify-between mb-2">
                                      <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                                        Clause Reference {i + 1}
                                      </span>
                                      <CheckCircle
                                        height={30}
                                        width={30}
                                        className={`${
                                          selectedClause === clause
                                            ? "text-green-600"
                                            : "text-gray-400"
                                        } transition-all duration-300`}
                                      />
                                    </div>
                                    <p className="text-sm text-slate-600 italic pt-1 text-left">
                                      "{clause}"
                                    </p>
                                  </button>
                                )
                              )
                            ) : (
                              <div className="text-center py-12 text-slate-400 text-sm flex flex-col items-center">
                                <FileX size={32} className="mb-3 opacity-50" />
                                No direct evidence found in the document.
                              </div>
                            )}
                          </div>
                        )}

                        {selectedTab === "suggestion" && (
                          <div className="fade-in">
                            {selectedObligation?.suggestion ? (
                              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm">
                                <h4 className="text-md text-amber-600 mb-3 flex items-center gap-2">
                                  <Lightbulb name="Lightbulb" size={20} />{" "}
                                  Recommendation
                                </h4>
                                <p className="text-sm leading-relaxed">
                                  {selectedObligation.suggestion}
                                </p>
                              </div>
                            ) : (
                              <div className="text-center py-12 text-slate-600 text-md flex flex-col items-center">
                                <CheckCircle
                                  size={32}
                                  className="mb-3 text-green-600 opacity-60"
                                />
                                Obligation is fully compliant. No action needed.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-sm font-medium text-slate-600 text-center">
                    No results
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: PDF Viewer */}
          <div className="lg:col-span-7">
            <PdfContainer
              file={pdfFile}
              selectedClause={selectedClause}
              defaultScale={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
