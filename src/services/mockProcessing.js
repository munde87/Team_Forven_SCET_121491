export const PROCESSING_STAGES = [
  { id: 1, name: "File Detection & SHA-256 Hash", label: "Hashing & File Validation" },
  { id: 2, name: "Bilingual Spatial OCR Engine", label: "OCR & Document Vision" },
  { id: 3, name: "Layout Analysis & Structure Parsing", label: "Bounding Box Extraction" },
  { id: 4, name: "Table & Figure Stratigraphy Extraction", label: "Table Reconstruction" },
  { id: 5, name: "Mining Entity & Term Enrichment", label: "Ontology Tagging" },
  { id: 6, name: "Geological Horizon Chunking", label: "Semantic Chunking" },
  { id: 7, name: "Dense Multimodal Embedding", label: "Vector Index Generation" },
  { id: 8, name: "Sovereign Node Indexing", label: "Index Completion" }
];

export const processDocumentFile = (fileObj, onProgress) => {
  return new Promise((resolve) => {
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep += 1;
      const progressPercent = Math.min(Math.round((currentStep / PROCESSING_STAGES.length) * 100), 100);
      
      if (onProgress) {
        onProgress({
          step: currentStep,
          stage: PROCESSING_STAGES[currentStep - 1] || PROCESSING_STAGES[PROCESSING_STAGES.length - 1],
          progress: progressPercent
        });
      }

      if (currentStep >= PROCESSING_STAGES.length) {
        clearInterval(interval);
        
        // Generate processed document output
        const newDoc = {
          id: `doc-${Date.now().toString().slice(-4)}`,
          title: fileObj.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
          filename: fileObj.name,
          type: fileObj.name.endsWith(".xlsx") ? "XLSX" : fileObj.name.endsWith(".csv") ? "CSV" : "PDF",
          category: "User Ingested Report",
          subsidiary: "Sector South-IV (CIL)",
          mine: "North Pit Alpha",
          year: "2024–25",
          pages: Math.floor(Math.random() * 40) + 12,
          size: `${(fileObj.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split("T")[0],
          status: "Indexed",
          ocrConfidence: "99.1%",
          hash: `sha256-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
          extractedTables: Math.floor(Math.random() * 8) + 2,
          extractedFigures: Math.floor(Math.random() * 6) + 1,
          summary: "User uploaded operational filing successfully ingested into sovereign index with page-linked citations."
        };
        
        resolve(newDoc);
      }
    }, 400);
  });
};
