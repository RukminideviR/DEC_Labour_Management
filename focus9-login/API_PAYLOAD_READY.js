// 🚀 FINAL API PAYLOAD - Ready to Send to Backend
// After completing all 5 tabs (WorkAllocation → TimeIn → Completion → TimeOut → QC)

// EXAMPLE PAYLOAD WITH REAL DATA
{
  "data": [
    {
      "Header": {
        "DocNo": "LA/AAY/1",
        "Date": 132776202,
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
        "sNarration": "dv",
        "TDSJVNo": "",
        "TDSBillAmount": 0,
        "TDS": 0,
        "HeaderId": 0,
        "Net": 67650,
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
          "FromUI": true,
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
          "Quantity": 12,
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
            "FileData": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAC0ALQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlbaWmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z",
            "FileName": "photo_1705488800000.jpg"
          },
          "InTime": 1705488721070,
          "OutTime": 1705484387435,
          "GeoPosition": "17.38252919649557,78.43315520745385",
          "TransactionId": 0,
          "BaseQuantity": 123,
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
// HOW TO SEND TO YOUR BACKEND API
// ============================================================

// In your API service (api.js or focusApi.js):

export const submitLabourAllocation = async (payload) => {
  try {
    const response = await fetch('/api/labour-allocation/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add your auth headers if needed
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Backend Response:", data);
    
    // Clear draft after successful submission
    clearDraft();
    
    return data;
  } catch (error) {
    console.error('Error submitting labour allocation:', error);
    throw error;
  }
};


// In QCTab.jsx:

import { submitLabourAllocation } from '../../api/api'; // or focusApi

const handleSubmit = async () => {
  // ... validation ...

  // Save QC into draft
  saveDraft({
    qc: {
      ...formData,
      completedQty,
      qcTime: new Date().toISOString(),
    },
  });

  // Get full draft
  const draft = getDraft();
  console.log("🧾 FULL DRAFT", draft);

  // Build ERP payload
  const finalPayload = buildCreateDoc(draft);
  console.log("✅ FULL ERP PAYLOAD", finalPayload);

  // Send to backend
  try {
    const response = await submitLabourAllocation(finalPayload);
    console.log("✅ Backend Response:", response);
    
    // Show success message
    alert("Labour allocation submitted successfully!");
    
    // Navigate to dashboard
    navigate("/dashboard");
  } catch (error) {
    console.error("❌ Submission failed:", error);
    alert("Error submitting labour allocation: " + error.message);
  }
};


// ============================================================
// IMPORTANT NOTES FOR BACKEND INTEGRATION
// ============================================================

/*
1. QUANTITY FIELDS:
   - "Quantity": 12 → Actual completed quantity (what worker completed)
   - "BaseQuantity": 123 → Target quantity (what was planned)

2. DATE FORMAT:
   - "Date": 132776202 → Excel serial date format
   - NOT Unix timestamp
   - Calculated as: days since 1900-01-01, starting from 1

3. TIME FORMAT:
   - "InTime": 1705488721070 → Milliseconds since Unix epoch
   - "OutTime": 1705484387435 → Milliseconds since Unix epoch
   - JavaScript Date().getTime()

4. PHOTO FORMAT:
   - "FileData": "data:image/jpeg;base64,..." → Base64 encoded
   - Maximum 2 photos (only first one stored in Body)
   - Store additional photos separately if needed

5. FLAGS:
   - Most flags are false for standard mobile entry
   - "FromUI": true indicates mobile app source
   - "Approved": true by default (adjust based on workflow)

6. OPTIONAL FIELDS:
   - HeaderId: 0 (auto-generated by backend)
   - TransactionId: 0 (auto-generated by backend)
   - TDS/TDSBillAmount: 0 (optional, depends on contract)

7. ERROR HANDLING:
   - Backend should validate all required fields
   - Return meaningful error messages
   - Include transaction ID in response for tracking

8. RESPONSE FORMAT:
   Expected from backend:
   {
     "result": 1,          // 1 = Success, 0 = Failure
     "message": "Labour allocation created successfully",
     "data": {
       "HeaderId": 738610,  // Auto-generated ID
       "TransactionId": 5835080,
       "DocNo": "LA/AAY/1"
     }
   }
*/


// ============================================================
// TESTING WITHOUT BACKEND
// ============================================================

// Mock submit for testing UI flow:

const mockSubmitLabourAllocation = (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock: Payload received and validated");
      console.log("Mock: Generating HeaderId and TransactionId");
      
      resolve({
        result: 1,
        message: "Labour allocation created successfully",
        data: {
          HeaderId: Math.floor(Math.random() * 1000000),
          TransactionId: Math.floor(Math.random() * 10000000),
          DocNo: "LA/AAY/" + Date.now()
        }
      });
    }, 1000);
  });
};

// Use in QCTab:
const response = await mockSubmitLabourAllocation(finalPayload);
