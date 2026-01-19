export const buildCreateDoc = (draft) => {
  console.log("buildCreateDoc called with draft:", draft);
  
  const timeIn = draft.timeIn || {};
  const work = draft.workAllocation || {};
  const completion = draft.completion || {};
  const timeOut = draft.timeOut || {};
  const qc = draft.qc || {};

  console.log("Extracted sections:", { timeIn, work, completion, timeOut, qc });

  // Helper: Convert date string to ERP Excel serial format (days since 1900-01-01)
  const toERPDate = (dateStr) => {
    if (!dateStr) return 0;
    const date = new Date(dateStr);
    const baseDate = new Date(1900, 0, 1);
    const diffTime = date.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  // Helper: Convert ISO datetime to epoch milliseconds
  const toEpochMillis = (dateTime) => {
    if (!dateTime) return 0;
    return new Date(dateTime).getTime();
  };

  // Helper: Extract base64 photo data
  const getPhotoData = (photo) => {
    if (!photo) return "";
    if (typeof photo === "string") return photo;
    if (photo.base64) return photo.base64;
    return "";
  };

  // =========================
  // Build BODY ITEM (Reference Structure)
  // =========================
  const bodyItem = {
    // FLOOR / LOCATION (from WorkAllocationTab)
    "Floor__Id": Number(work.floor?.Floor__Id || 0),
    "Floor__Name": work.floor?.Floor__Name || "",
    "Floor__Code": work.floor?.Floor__Code || work.floor?.Floor__Name || "",
    "Floor__Alias": work.floor?.Floor__Alias || work.floor?.Floor__Name || "",

    // LABOUR SKILL TYPE (from TimeInTab)
    "Labour Skil Type__Id": Number(timeIn.skill?.Labour_Skill__Id || 0),
    "Labour Skil Type__Name": timeIn.skill?.Labour_Skill__Name || "",
    "Labour Skil Type__Code": timeIn.skill?.Labour_Skill__Code || "",
    "Labour Skil Type__Alias": timeIn.skill?.Labour_Skill__Alias || "",

    // QUANTITIES & RATE (from WorkAllocationTab & CompletionTab)
    "Quantity": Number(completion.completedQty || 0), // Completed Qty from CompletionTab
    "AltQuantity": 0,
    "Rate": Number(work.rate || 0), // From WorkAllocationTab
    "Gross": Number(work.amount || 0), // From WorkAllocationTab

    // DISCOUNT (Standard structure)
    "Discount": {
      "Input": 0,
      "FieldName": "Discount",
      "FieldId": 3655,
      "ColMap": 0,
      "Value": 0,
    },

    // LABOUR PHOTO (from CompletionTab)
    "LabourPhoto": {
      "FileData": completion.photos && completion.photos.length > 0
        ? getPhotoData(completion.photos[0])
        : "",
      "FileName": completion.photos && completion.photos.length > 0
        ? `photo_${Date.now()}.jpg`
        : "",
    },

    // TIME IN/OUT (from TimeInTab & TimeOutTab) - IN EPOCH MILLISECONDS
    "InTime": toEpochMillis(timeIn.inTime) || 0,
    "OutTime": toEpochMillis(timeOut.outTime) || 0,

    // GEO POSITION (from TimeInTab)
    "GeoPosition": timeIn.gps
      ? `${timeIn.gps.lat},${timeIn.gps.lng}`
      : "",

    // TRANSACTION ID (Auto-generated from backend)
    "TransactionId": Number(qc.TransactionId || 0),

    // BASE QUANTITY (Original target qty from WorkAllocationTab)
    "BaseQuantity": Number(work.targetQty || 0),

    // BODY FLAGS (Reference structure)
    "BodyFlags": {
      "BRS": false,
      "ConfirmBins": true,
      "ForexFlux": false,
      "FreeQty": false,
      "InternalIIDST": false,
      "PDC": false,
      "PDCDisc": false,
      "SuspendBase": false,
      "SuspendFA": false,
      "SuspendLink": false,
      "SuspendRef": false,
      "TransferToPnL": false,
      "Void": false,
    },
  };

  // =========================
  // Build HEADER (Reference Structure)
  // =========================
  const header = {
    // DOCUMENT INFO
    "DocNo": "LA/AAY/1", // Document number
    "Date": toERPDate(timeIn.date), // From TimeInTab
    "Time": "",

    // CONTRACTOR / VENDOR (from TimeInTab - Contractor dropdown)
    "VendorAC__Id": Number(timeIn.contractor?.VendorAC__Id || 0),
    "VendorAC__Name": timeIn.contractor?.VendorAC__Name || "",
    "VendorAC__Code": timeIn.contractor?.VendorAC__Code || "",
    "VendorAC__Alias": timeIn.contractor?.VendorAC__Alias || "",

    // INVENTORY FLAGS
    "UpdateStock": "",
    "RaiseReceipt": "",

    // SITE (from TimeInTab - Site dropdown)
    "Site__Id": Number(timeIn.site?.Site__Id || 0),
    "Site__Name": timeIn.site?.Site__Name || "",
    "Site__Code": timeIn.site?.Site__Code || "",
    "Site__Alias": timeIn.site?.Site__Alias || "",

    // PILE BLOCK MASTER (from WorkAllocationTab - Block dropdown)
    "PILEBlock Master__Id": Number(work.block?.Block__Id || 0),
    "PILEBlock Master__Name": work.block?.Block__Name || "",
    "PILEBlock Master__Code": work.block?.Block__Name || "",
    "PILEBlock Master__Alias": work.block?.Block__Name || "",

    // BUILDING (from WorkAllocationTab - Block dropdown)
    "Building__Id": Number(work.block?.Block__Id || 0),
    "Building__Name": work.block?.Block__Name || "",
    "Building__Code": work.block?.Block__Name || "",
    "Building__Alias": work.block?.Block__Name || "",

    // CONTRACT TYPE (from TimeInTab - Contract Type dropdown)
    "Contract Type__Id": Number(timeIn.contractType?.Contract_Type__Id || 0),
    "Contract Type__Name": timeIn.contractType?.Contract_Type__Name || "",
    "Contract Type__Code": timeIn.contractType?.Contract_Type__Code || "",
    "Contract Type__Alias": timeIn.contractType?.Contract_Type__Alias || "",

    // NARRATION & TDS
    "sNarration": completion.remarks || "",
    "TDSJVNo": "",
    "TDSBillAmount": 0,
    "TDS": 0,

    // HEADER ID (Auto from backend)
    "HeaderId": Number(qc.HeaderId || 0),

    // AMOUNT
    "Net": Number(work.amount || 0), // From WorkAllocationTab
    "TransactionNet": 0,

    // HEADER FLAGS (Reference structure)
    "Flags": {
      "AlreadyLoaded": false,
      "Amended": false,
      "Approved": true,
      "AuthByHigherUps": false,
      "Cancelled": false,
      "CantEdit": false,
      "CantPrint": false,
      "CheckCreditLimit": true,
      "CheckNegativeBudget": true,
      "CheckNegativeCash": true,
      "CheckNegativeStock": true,
      "CheckOverdueBills": true,
      "CheckReorderLevel": true,
      "Editing": true,
      "FromPDC": false,
      "FromTrigger": false,
      "FromUI": false,
      "FromWeb": false,
      "Internal": false,
      "NoBatchCheck": false,
      "NoLinkCheck": false,
      "PostCashEntry": false,
      "PostingFromUI": false,
      "RequestCrLimit": false,
      "Suspended": false,
      "TDSCertPrepared": false,
      "TDSPaid": false,
      "UnsaveInv": false,
      "UpdateFA": false,
      "UpdateInv": false,
      "Version": false,
      "WMSAllocated": false,
    },
  };

  // =========================
  // Final ERP Payload
  // =========================
  return {
    data: [
      {
        Body: [bodyItem],
        Header: header,
        Footer: [],
      },
    ],
    result: 1,
    message: null,
  };
};
