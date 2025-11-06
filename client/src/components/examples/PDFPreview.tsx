import { useState } from "react";
import PDFPreview from '../PDFPreview';
import { Button } from "@/components/ui/button";

export default function PDFPreviewExample() {
  const [open, setOpen] = useState(true);
  
  const sampleData = {
    employeeName: "Roshan Saroj",
    position: "Digital Consultant",
    location: "Gurgaon",
    dateOfJoining: "2025-11-06",
    acceptanceDeadline: "2025-11-05",
    basicPay: "30000",
    hra: "9666",
    specialAllowance: "14500",
    probationPeriod: "6",
    bonuses: [
      { label: "Retention Bonus", amount: "100000" }
    ]
  };

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Preview</Button>
      <PDFPreview open={open} onOpenChange={setOpen} data={sampleData} />
    </div>
  );
}
