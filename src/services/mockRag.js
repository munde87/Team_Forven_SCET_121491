import { SAMPLE_RETRIEVAL_RESULTS } from "../data/chunks";

export const executeRagQuery = (queryText, filters = {}) => {
  return new Promise((resolve) => {
    // Determine matching preset key or construct dynamic response
    const queryLower = queryText.toLowerCase();
    
    let baseResult;
    if (queryLower.includes("2025") || queryLower.includes("cil") || queryLower.includes("percent") || queryLower.includes("growth") || queryLower.includes("5 year")) {
      baseResult = SAMPLE_RETRIEVAL_RESULTS["cil-production-2025"];
    } else if (queryLower.includes("safety") || queryLower.includes("slope") || queryLower.includes("hazard")) {
      baseResult = SAMPLE_RETRIEVAL_RESULTS["safety-issues"];
    } else if (queryLower.includes("geological") || queryLower.includes("seam") || queryLower.includes("borehole")) {
      baseResult = SAMPLE_RETRIEVAL_RESULTS["geological-exploration"];
    } else {
      // Default to production trends
      baseResult = SAMPLE_RETRIEVAL_RESULTS["production-trends"];
    }

    // Apply filters if specified
    let filteredCandidates = baseResult.candidates;
    if (filters.mine && filters.mine !== "All Mines") {
      filteredCandidates = filteredCandidates.filter(c => c.docTitle.includes(filters.mine) || true);
    }

    setTimeout(() => {
      resolve({
        query: queryText,
        intent: baseResult.intent,
        answer: baseResult.answer,
        confidence: baseResult.confidence,
        candidates: filteredCandidates,
        verifiedCount: filteredCandidates.filter(c => c.status === "VERIFIED").length,
        rejectedCount: filteredCandidates.filter(c => c.status === "REJECTED").length,
        timestamp: new Date().toISOString()
      });
    }, 1200);
  });
};
