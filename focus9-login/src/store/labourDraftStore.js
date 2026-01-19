export const saveDraft = (data) => {
    const existing = JSON.parse(localStorage.getItem("LABOUR_DRAFT") || "{}");
    const updated = { ...existing, ...data };
    localStorage.setItem("LABOUR_DRAFT", JSON.stringify(updated));
  };
  
  export const getDraft = () => {
    return JSON.parse(localStorage.getItem("LABOUR_DRAFT") || "{}");
  };
  
  export const clearDraft = () => {
    localStorage.removeItem("LABOUR_DRAFT");
  };
  