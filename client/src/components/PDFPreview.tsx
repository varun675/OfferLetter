import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import PDFDocument from "./PDFDocument";

interface BonusField {
  label: string;
  amount: string;
}

interface PDFPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    salutation: string;
    employeeName: string;
    position: string;
    location: string;
    dateOfJoining: string;
    acceptanceDeadline: string;
    basicPay: string;
    hra: string;
    specialAllowance: string;
    probationPeriod: string;
    specialClause: string;
    logoImage: string;
    signatoryTitle: string;
    signatoryName: string;
    signatureImage: string;
    bonuses: BonusField[];
  };
}

export default function PDFPreview({ open, onOpenChange, data }: PDFPreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-full sm:max-w-4xl h-[95vh] sm:h-auto max-h-[95vh] sm:max-h-[90vh] p-3 sm:p-6 flex flex-col" data-testid="dialog-pdf-preview">
        <DialogHeader className="pb-2 shrink-0">
          <DialogTitle className="text-lg sm:text-xl">Offer Letter Preview</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 overflow-auto pr-2 sm:pr-4" style={{maxHeight: 'calc(95vh - 5rem)'}}>
          <PDFDocument data={data} testIdSuffix="-preview" isPrintMode={false} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
