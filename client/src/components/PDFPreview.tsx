import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CompensationTable from "./CompensationTable";
import logoImg from "@assets/generated_images/Codesmotech_company_logo_587f1306.png";

interface BonusField {
  label: string;
  amount: string;
}

interface PDFPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    employeeName: string;
    position: string;
    location: string;
    dateOfJoining: string;
    acceptanceDeadline: string;
    basicPay: string;
    hra: string;
    specialAllowance: string;
    probationPeriod: string;
    bonuses: BonusField[];
  };
}

export default function PDFPreview({ open, onOpenChange, data }: PDFPreviewProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]" data-testid="dialog-pdf-preview">
        <DialogHeader>
          <DialogTitle>Offer Letter Preview</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
          <div className="space-y-8">
            {/* Page 1 */}
            <div className="bg-white p-8 rounded-lg border-2 border-primary/20 space-y-6">
              <img src={logoImg} alt="Codesmotech" className="h-12 mb-6" />
              
              <div className="space-y-4 text-sm">
                <p><strong>To : Mr {data.employeeName || "________"}</strong></p>
                <p>{today}</p>
                <p><strong>Dear {data.employeeName ? data.employeeName.split(' ')[0] : "________"},</strong></p>
                <p>Congratulations!</p>
                
                <p>
                  On behalf of Codesmotech Technology Consulting Private Limited ("Company"), 
                  we are pleased to offer you the position of <strong>{data.position || "________"}</strong>, 
                  at our {data.location || "________"} location.
                </p>
                
                <p>
                  This offer takes effect from your date of joining set i.e.{' '}
                  <strong>{formatDate(data.dateOfJoining)}</strong> or any date sooner mutually 
                  agreed by both the parties and you are required to accept and attest this letter on or before{' '}
                  <strong>{formatDate(data.acceptanceDeadline) || formatDate(data.dateOfJoining)}</strong>.
                </p>
                
                <p>
                  Your compensation package would be as listed in <strong>Annexure below</strong>. 
                  The structure of your compensation plan may be altered / edited in the future 
                  in lines with the compensation policy set forth by the Company.
                </p>
              </div>
            </div>

            {/* Page 2 - Terms */}
            <div className="bg-white p-8 rounded-lg border-2 border-primary/20 space-y-4 text-sm">
              <img src={logoImg} alt="Codesmotech" className="h-10 mb-4" />
              
              <p>
                As per the Company policy, the probation period applicable for you shall be{' '}
                <strong>{data.probationPeriod || "six (6)"} months</strong>, which may be reduced 
                or extended as per the discretion of the Company & as per applicable laws. Your base 
                location will be at {data.location || "________"} office. However, as and when required, 
                your service can be transferred to any of the offices in India or abroad as per need 
                of the business.
              </p>
              
              <p>
                All compensation indicated in this letter is subject to continued satisfactory employment. 
                In the event of any disciplinary issues, misconduct, or unsatisfactory performance, the 
                Company reserves the right to terminate your employment immediately without notice or 
                compensation, other than what is required by applicable law. This letter constitutes our 
                complete offer package to recognize your new responsibilities and replaces and supersedes 
                in its entirety over any other previous offer letter.
              </p>
              
              <p>
                Your appointment is subject to satisfactory reference checks and clearance from any 
                secrecy / service agreements that you may have executed, which could have a bearing 
                on your working with us.
              </p>
              
              <p>
                Any promises or representations, whether written or oral, related to your terms of 
                employment are subject to your appointment letter.
              </p>
            </div>

            {/* Page 3 - More Terms */}
            <div className="bg-white p-8 rounded-lg border-2 border-primary/20 space-y-4 text-sm">
              <img src={logoImg} alt="Codesmotech" className="h-10 mb-4" />
              
              <p>
                This letter of offer is based on the information furnished in your application for 
                employment and during the discussions you had with us. If, at any time in future, 
                it comes to light that any of this information is incorrect or any relevant information 
                has been withheld, then your employment is liable to be terminated without notice.
              </p>
              
              <p className="font-semibold">
                We welcome you to our Company and look forward to your contribution to the global 
                growth of the organisation and yourself.
              </p>
              
              <p>
                <strong>On the date of joining,</strong> please bring(or submit on email, as may be the case) 
                the following documents for verification / submission
              </p>
              
              <ol className="list-decimal ml-6 space-y-1">
                <li>Educational certificates and mark sheets.</li>
                <li>Relieving letter & experience certificate from previous employer[s].</li>
                <li>Salary certificate from previous employer.</li>
                <li>Passport</li>
                <li>Three passport size and one stamp size coloured photographs</li>
                <li>A cancelled cheque of your active bank account</li>
              </ol>
            </div>

            {/* Page 4 - Closing */}
            <div className="bg-white p-8 rounded-lg border-2 border-primary/20 space-y-6 text-sm">
              <img src={logoImg} alt="Codesmotech" className="h-10 mb-4" />
              
              <p>Wish you all the best!</p>
              
              <div className="space-y-1">
                <p>Yours Sincerely,</p>
                <p>For CodesmoTech Technology Consulting Private Limited</p>
              </div>
              
              <div className="pt-8 space-y-1">
                <p>VP, Operations and Finance</p>
                <p>Rahul Sharma</p>
              </div>
            </div>

            {/* Page 5 - Annexure */}
            <div className="bg-white p-8 rounded-lg border-2 border-primary/20">
              <img src={logoImg} alt="Codesmotech" className="h-10 mb-6" />
              
              <CompensationTable
                employeeName={data.employeeName}
                position={data.position}
                basicPay={data.basicPay}
                hra={data.hra}
                specialAllowance={data.specialAllowance}
                bonuses={data.bonuses}
              />
              
              <div className="mt-8 space-y-4 text-sm">
                <p>
                  Your individual performance and community outreach will be graded in the four 
                  key areas that are part of our Company's DNA :
                </p>
                
                <ul className="list-disc ml-6 space-y-1">
                  <li>Client Intimacy</li>
                  <li>Knowledge Sharing and Thought Leadership</li>
                  <li>Quality Without Compromise</li>
                  <li>People First</li>
                </ul>
                
                <p>
                  Our induction program will brief you on our core values and the DNA components 
                  mentioned above, as you start. Your assigned manager will work with you to draft 
                  your annual charter in these four areas.
                </p>
              </div>
            </div>

            {/* Page 6 - Acceptance */}
            <div className="bg-white p-8 rounded-lg border-2 border-primary/20 space-y-6">
              <img src={logoImg} alt="Codesmotech" className="h-10 mb-4" />
              
              <div className="text-center space-y-4 py-8">
                <h3 className="text-2xl font-bold">TO BE FILLED BY THE CONSULTANT</h3>
                <p className="text-lg font-semibold bg-primary/10 p-4 rounded">
                  We need your CONFIRMATION
                </p>
              </div>
              
              <div className="border-2 border-border rounded-lg p-8 space-y-8">
                <p>I hereby acknowledge and accept the offer mentioned above.</p>
                
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Signature</p>
                    <Separator className="border-t-2 border-border" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Date</p>
                    <Separator className="border-t-2 border-border" />
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <p className="text-sm text-muted-foreground">Name:</p>
                  <Separator className="border-t-2 border-border" />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
