// 🧾 QUICK REFERENCE: Data Structure Transformation

// ============================================================
// BEFORE (Your Current Structure - Had Issues)
// ============================================================
{
  completion: {
    completedQty: 12,
    photos: ["data:image/jpeg;base64,..."],
    remarks: "dv",
    gps: {lat: 17.38252919649557, lng: 78.43315520745385}
  },
  qc: {
    qcPhotos: [...],
    qcExecutiveId: "101",
    qcStatus: "PASS",
    qcRemarks: "",
    qcTime: "2026-01-17T10:38:39.970Z"
  },
  timeIn: {
    date: "2026-01-17",
    site: {Site__Id: 454, Site__Name: "Adarsh Awash Yojana", ...},
    contractType: {Contract_Type__Id: 1, Contract_Type__Name: "Daily Rate", ...},
    // ... etc - all separate, no unified structure
  }
  // ❌ PROBLEMS:
  // - Data in separate localStorage keys
  // - No global draft merging
  // - buildCreateDoc incomplete
}

// ============================================================
// AFTER (Correct ERP Structure)
// ============================================================
{
  "data": [
    {
      "Header": {
        "DocNo": "LA/AAY/1",
        "Date": 132776202,                    // Excel serial format
        "Time": "",
        "VendorAC__Id": 169297,
        "VendorAC__Name": "11 DOTS STUDIO",
        "VendorAC__Code": "600011",
        "VendorAC__Alias": "11 DOTS STUDIO (PROP, INDERPAL SINGH)",
        "UpdateStock": "",
        "RaiseReceipt": "",
        "Site__Id": 454,
        "Site__Name": "Adarsh Awash Yojana",
        "Site__Code": "AAY-01",
        "Site__Alias": "Adarsh Awash Yojana",
        "PILEBlock Master__Id": 1,
        "PILEBlock Master__Name": "Tower A",
        "PILEBlock Master__Code": "Tower A",
        "PILEBlock Master__Alias": "Tower A",
        "Building__Id": 1,
        "Building__Name": "Tower A",
        "Building__Code": "Tower A",
        "Building__Alias": "Tower A",
        "Contract Type__Id": 1,
        "Contract Type__Name": "Daily Rate",
        "Contract Type__Code": "Daily Rate",
        "Contract Type__Alias": "Daily Rate",
        "sNarration": "dv",                   // From completion.remarks
        "TDSJVNo": "",
        "TDSBillAmount": 0,
        "TDS": 0,
        "HeaderId": 0,
        "Net": 67650,                         // From workAllocation.amount
        "TransactionNet": 0,
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
          "FromUI": true,                    // Mobile app entry
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
          "WMSAllocated": false
        }
      },
      "Body": [
        {
          "Floor__Id": 1,
          "Floor__Name": "Ground Floor",
          "Floor__Code": "Ground Floor",
          "Floor__Alias": "Ground Floor",
          "Labour Skil Type__Id": 1,
          "Labour Skil Type__Name": "MS",
          "Labour Skil Type__Code": "MS",
          "Labour Skil Type__Alias": "MS",
          "Quantity": 12,                     // ⭐ COMPLETED qty (NOT 123)
          "AltQuantity": 0,
          "Rate": 550,
          "Gross": 67650,
          "Discount": {
            "Input": 0,
            "FieldName": "Discount",
            "FieldId": 3655,
            "ColMap": 0,
            "Value": 0
          },
          "LabourPhoto": {
            "FileData": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
            "FileName": "photo_1705488800000.jpg"
          },
          "InTime": 1705488721070,            // Epoch milliseconds
          "OutTime": 1705484387435,
          "GeoPosition": "17.38252919649557,78.43315520745385",
          "TransactionId": 0,
          "BaseQuantity": 123,                // TARGET qty
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
            "Void": false
          }
        }
      ],
      "Footer": []
    }
  ],
  "result": 1,
  "message": null
}


// ============================================================
// HOW IT WORKS - Step by Step
// ============================================================

// Step 1: WorkAllocationTab.jsx
// ─────────────────────────────
import { saveDraft } from "../../store/labourDraftStore";

const handleSubmit = () => {
  // ... validation ...
  const formData = {
    block: { Block__Id: 1, Block__Name: "Tower A" },
    floor: { Floor__Id: 1, Floor__Name: "Ground Floor" },
    grid: "334tvht",
    workCode: { WorkCode: "BRK-001", WorkName: "Brick Work 230mm", Rate: 550 },
    targetQty: "123",
    completedQty: "",
    rate: 550,
    amount: 67650
  };
  
  saveDraft({ workAllocation: formData });  // ✅ Save to global draft
  onSuccess(formData);
};


// Step 2: TimeInTab.jsx
// ─────────────────────
import { saveDraft } from "../../store/labourDraftStore";

const handleSubmit = () => {
  // ... validation ...
  const formData = {
    date: "2026-01-17",
    site: { Site__Id: 454, Site__Name: "Adarsh Awash Yojana", ... },
    engineer: { Engineer__Id: 1, Engineer__Name: "Engineer Anil" },
    contractType: { Contract_Type__Id: 1, Contract_Type__Name: "Daily Rate", ... },
    contractor: { VendorAC__Id: 169297, VendorAC__Name: "11 DOTS STUDIO", ... },
    labour: { Labour__Id: 1, Labour__Name: "Ramesh" },
    skill: { Labour_Skill__Id: 1, Labour_Skill__Name: "MS", ... },
    labourAllotmentNo: "",
    photo: "data:image/jpeg;base64,...",
    gps: { lat: 17.38252712911064, lng: 78.43315414473666 },
    inTime: "2026-01-17T10:37:41.070Z"
  };
  
  saveDraft({ timeIn: formData });  // ✅ Merges with workAllocation
  onSuccess();
};


// Step 3: CompletionTab.jsx
// ──────────────────────────
import { saveDraft, getDraft } from "../../store/labourDraftStore";

const handleSubmit = () => {
  // ... validation ...
  const formData = {
    completedQty: 12,
    photos: ["data:image/jpeg;base64,..."],
    remarks: "dv",
    gps: { lat: 17.38252919649557, lng: 78.43315520745385 }
  };
  
  saveDraft({ completion: formData });  // ✅ Merges with timeIn + workAllocation
  onSuccess();
};


// Step 4: TimeOutTab.jsx
// ──────────────────────
import { saveDraft } from "../../store/labourDraftStore";

const handleSubmit = () => {
  // ... validation ...
  const payload = {
    outTime: "2026-01-17T08:59:47.435Z",
    gps: { lat: 17.382532495555743, lng: 78.43315416056639 },
    photo: "data:image/jpeg;base64,...",
    engineerId: "2"
  };
  
  saveDraft({ timeOut: payload });  // ✅ Merges with all previous
  onSuccess();
};


// Step 5: QCTab.jsx (Final Transformation)
// ─────────────────────────────────────────
import { getDraft } from "../../store/labourDraftStore";
import { buildCreateDoc } from "../../builders/buildCreateDoc";

const handleSubmit = () => {
  // ... validation ...
  
  // Save QC data
  saveDraft({
    qc: {
      qcPhotos: [...],
      qcExecutiveId: "101",
      qcStatus: "PASS",
      qcRemarks: "",
      completedQty: 12,
      qcTime: new Date().toISOString()
    }
  });
  
  // Get complete merged draft
  const draft = getDraft();
  // draft now has: {workAllocation, timeIn, completion, timeOut, qc}
  
  // Transform to ERP format
  const finalPayload = buildCreateDoc(draft);
  
  console.log("✅ FULL ERP PAYLOAD", finalPayload);
  // Now ready to send to backend API
};


// ============================================================
// localStorage.LABOUR_DRAFT Evolution
// ============================================================

// After WorkAllocationTab:
{
  "workAllocation": {
    "block": {...},
    "floor": {...},
    "grid": "334tvht",
    "workCode": {...},
    "targetQty": "123",
    "rate": 550,
    "amount": 67650
  }
}

// After TimeInTab:
{
  "workAllocation": {...},
  "timeIn": {
    "date": "2026-01-17",
    "site": {...},
    "engineer": {...},
    // ... all fields ...
  }
}

// After CompletionTab:
{
  "workAllocation": {...},
  "timeIn": {...},
  "completion": {
    "completedQty": 12,
    "photos": [...],
    "remarks": "dv",
    "gps": {...}
  }
}

// After TimeOutTab:
{
  "workAllocation": {...},
  "timeIn": {...},
  "completion": {...},
  "timeOut": {
    "outTime": "2026-01-17T08:59:47.435Z",
    "gps": {...},
    "photo": "...",
    "engineerId": "2"
  }
}

// After QCTab:
{
  "workAllocation": {...},
  "timeIn": {...},
  "completion": {...},
  "timeOut": {...},
  "qc": {
    "qcPhotos": [...],
    "qcExecutiveId": "101",
    "qcStatus": "PASS",
    "qcRemarks": "",
    "completedQty": 12,
    "qcTime": "2026-01-17T10:38:39.970Z"
  }
}

// buildCreateDoc(draft) → Final ERP Payload (shown above)
