const dummyMasters = {
  // ================= SITE MASTER =================
  sites: [
    {
      Site__Id: 454,
      Site__Name: "Adarsh Awash Yojana",
      Site__Code: "AAY-01",
      Site__Alias: "Adarsh Awash Yojana",
    },
    {
      Site__Id: 455,
      Site__Name: "Green City",
      Site__Code: "GC-01",
      Site__Alias: "Green City",
    },
  ],

  // ================= SITE ENGINEER MASTER =================
  engineers: [
    { Engineer__Id: 1, Engineer__Name: "Engineer Anil" },
    { Engineer__Id: 2, Engineer__Name: "Engineer Sunil" },
  ],

  // ================= CONTRACT TYPE MASTER =================
  contractTypes: [
    {
      Contract_Type__Id: 1,
      Contract_Type__Name: "Daily Rate",
      Contract_Type__Code: "DR",
      Contract_Type__Alias: "Daily Rate",
    },
    {
      Contract_Type__Id: 2,
      Contract_Type__Name: "Rate Contract",
      Contract_Type__Code: "RC",
      Contract_Type__Alias: "Rate Contract",
    },
  ],

  // ================= CONTRACTOR MASTER =================
  contractors: [
    {
      VendorAC__Id: 169297,
      VendorAC__Name: "11 DOTS STUDIO",
      VendorAC__Code: "600011",
      VendorAC__Alias: "11 DOTS STUDIO",
    },
  ],

  // ================= LABOUR MASTER =================
  labours: [
    { Labour__Id: 1, Labour__Name: "Ramesh" },
    { Labour__Id: 2, Labour__Name: "Suresh" },
  ],

  // ================= SKILL MASTER =================
  skills: [
    {
      Labour_Skill__Id: 1,
      Labour_Skill__Name: "MS",
      Labour_Skill__Code: "MS",
      Labour_Skill__Alias: "MS",
    },
    {
      Labour_Skill__Id: 2,
      Labour_Skill__Name: "MC",
      Labour_Skill__Code: "MC",
      Labour_Skill__Alias: "MC",
    },
  ],

  // ================= BLOCK MASTER =================
  blocks: [
    { PILEBlock__Id: 1, PILEBlock__Name: "Block A" },
    { PILEBlock__Id: 2, PILEBlock__Name: "Block B" },
  ],

  // ================= PHASE MASTER =================
  phases: [
    { Phase__Id: 1, Phase__Name: "Phase 1", EnableFloor: true },
    { Phase__Id: 2, Phase__Name: "Phase 2", EnableFloor: false },
  ],

  // ================= FLOOR MASTER =================
  floors: [
    { Floor__Id: 1, Floor__Name: "Floor 1", BlockId: 1 },
    { Floor__Id: 2, Floor__Name: "Floor 2", BlockId: 1 },
    { Floor__Id: 3, Floor__Name: "Floor 3", BlockId: 2 },
  ],

  // ================= QC EXECUTIVE MASTER =================
qcExecutives: [
  { QC__Id: 101, QC__Name: "Site Engineer - Anil" },
  { QC__Id: 102, QC__Name: "Site Engineer - Sunil" },
  { QC__Id: 103, QC__Name: "QC Engineer - Ramesh" },
],


  // ================= WORK CODE MASTER =================
  workCodes: [
    { WorkCode__Id: 1, WorkName: "Foundation", Rate: 120 },
    { WorkCode__Id: 2, WorkName: "Plumbing", Rate: 100 },
    { WorkCode__Id: 3, WorkName: "Electrical", Rate: 150 },
  ],
};

export default dummyMasters;
