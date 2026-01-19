import { useState } from "react";
import TimeInTab from "./TimeInTab";
import WorkAllocationTab from "./WorkAllocationTab";
import CompletionTab from "./CompletionTab";
import TimeOutTab from "./TimeOutTab";
import QCTab from "./QCTab";

function LabourTransaction() {
  const [step, setStep] = useState(0);

  const [data, setData] = useState({
    timeIn: {},
    allocation: {},
    completion: {},
    timeOut: {},
    qc: {}
  });

  const next = () => setStep(prev => prev + 1);

  const submitAll = () => {
    const finalPayload = {
      ...data.timeIn,
      ...data.allocation,
      ...data.completion,
      ...data.timeOut,
      ...data.qc,
      amount: (data.completion.completedQty || 0) * (data.allocation.rate || 0)
    };

    console.log("FINAL DATA", finalPayload);
    alert("Check console");
  };

  return (
    <>
      {step === 0 && <TimeInTab setData={setData} next={next} />}
      {step === 1 && <WorkAllocationTab setData={setData} next={next} />}
      {step === 2 && <CompletionTab setData={setData} data={data} next={next} />}
      {step === 3 && <TimeOutTab setData={setData} next={next} />}
      {step === 4 && <QCTab setData={setData} submitAll={submitAll} />}
    </>
  );
}

export default LabourTransaction;
