import {
  CheckCircle,
  Cpu,
  FileX,
  Lightbulb,
  MousePointerClick,
} from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "./StatusBadge";

export function TabsPanel({
  selectedObligation,
  selectedClause,
  setSelectedClause,
}: any) {
  const [activeTab, setActiveTab] = useState<
    "details" | "evidence" | "suggestion"
  >("details");

  const getScoreContent = (score: number) => {
    if (score > 75) return { color: "text-red-600", text: "Bad" };
    if (score > 50) return { color: "text-red-600", text: "Average" };
    return { color: "text-green-600", text: "Good" };
  };

  const scoreConent = getScoreContent(93);

  const changeClause = (clause: string) => {
    setSelectedClause(clause);
  };

  const hanleChangeTab = (tab: "details" | "evidence" | "suggestion") => {
    setActiveTab(tab);
    setSelectedClause("");
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl p-5 h-[600px] flex flex-col shadow-lg">
      {selectedObligation ? (
        <>
          <div className="p-1 pb-4 border-b border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <StatusBadge status={selectedObligation.is_present} />
              <span className="text-md text-slate-600 font-mono">
                ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}
              </span>
            </div>
            <h2 className="text-md font-bold text-slate-800 leading-snug">
              {selectedObligation.obligation}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 bg-purple-50 rounded-lg p-1 px-2 mt-3">
            <button
              onClick={() => hanleChangeTab("details")}
              className={`flex-1 px-4 py-2 rounded-lg transition-all relative cursor-pointer ${
                activeTab === "details"
                  ? "bg-white text-purple-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-purple-100"
              }`}
            >
              Details
            </button>
            <button
              onClick={() => hanleChangeTab("evidence")}
              className={`flex-1 px-4 py-2 rounded-lg transition-all relative cursor-pointer ${
                activeTab === "evidence"
                  ? "bg-white text-purple-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-purple-100"
              }`}
            >
              Evidence
            </button>
            <button
              onClick={() => hanleChangeTab("suggestion")}
              className={`flex-1 px-4 py-2 rounded-lg transition-all relative cursor-pointer ${
                activeTab === "suggestion"
                  ? "bg-white text-purple-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-purple-100"
              }`}
            >
              Suggestion
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white rounded-full text-xs flex items-center justify-center">
                1
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "details" && (
              <div className="space-y-6 fade-in">
                <div className="p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 shadow-sm">
                  <span className="text-xs font-bold text-indigo-600 uppercase mb-3 flex items-center gap-2">
                    <Cpu size={14} /> Analysis Reasoning
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedObligation.reason}
                  </p>
                </div>
                <div className="p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 shadow-sm">
                  <span className="text-gray-900 mb-2">Similarity Score</span>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl" style={{ color: "#A100FF" }}>
                        93.8%
                      </span>
                      <span className={`text-sm ${scoreConent.color}`}>
                        {scoreConent.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: "93.8%", backgroundColor: "#A100FF" }}
                      />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Overall similarity is {scoreConent.text} with a high
                    accuracy rate. Minor issues detected in formatting and
                    completeness.
                  </p>
                </div>
                <span className="text-gray-900 mb-2 p-3 flex justify-between">
                  <span>Keywords Matched</span>
                  <span>{selectedObligation.keyword_hits.length}</span>
                </span>
              </div>
            )}

            {activeTab === "evidence" && (
              <div className="space-y-4">
                <div className="space-y-4 fade-in">
                  {/* <div className="p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 shadow-sm"> */}
                  {selectedObligation.supporting_clauses &&
                  selectedObligation.supporting_clauses.length > 0 ? (
                    selectedObligation.supporting_clauses.map(
                      (clause: string, i: number) => (
                        <button
                          key={i}
                          className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 block w-full scale-98
      ${
        selectedClause === clause
          ? "bg-white border-l-4 border-green-500 scale-100 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
          : "bg-white/70 hover:bg-white hover:shadow-md border-l-4 border-indigo-300 hover:border-indigo-500"
      }`}
                          onClick={() => changeClause(clause)}
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
                              } transition-all duration-300 group-hover:scale-110 absolute right-5`}
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
                  {/* </div> */}
                </div>
              </div>
            )}

            {activeTab === "suggestion" && (
              <div className="fade-in">
                {selectedObligation.suggestion ? (
                  <div className="p-4 bg-linear-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 shadow-sm">
                    <h4 className="text-md text-amber-600 mb-3 flex items-center gap-2">
                      <Lightbulb name="Lightbulb" size={20} /> Recommendation
                    </h4>
                    <p className="text-sm  leading-relaxed">
                      {selectedObligation.suggestion}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-600 text-md flex flex-col items-center">
                    <CheckCircle
                      size={32}
                      className="mb-3 text-green-600 opacity-60"
                    />
                    Obligation is fully compliant.
                    <br />
                    No action needed.
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <MousePointerClick size={24} className="text-slate-300" />
          </div>
          <span className="text-slate-800 font-semibold text-xl mb-1">
            No Selection
          </span>
          <p className="text-sm max-w-[250px]">
            Select an obligation from the list to view detailed analysis and
            evidence.
          </p>
        </div>
      )}
    </div>
  );
}
