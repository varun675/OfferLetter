import { Separator } from "@/components/ui/separator";
import CompensationTable from "./CompensationTable";
import logoImg from "@assets/image_1762444072597.png";
import coverPageImg from "@assets/image_1762444287787.png";

interface BonusField {
  label: string;
  amount: string;
}

interface PDFDocumentProps {
  data: {
    salutation: string;
    employeeName: string;
    position: string;
    location: string;
    dateOfJoining: string;
    acceptanceDeadline: string;
    annualCTC: string;
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
  testIdSuffix?: string;
  isPrintMode?: boolean;
}

export default function PDFDocument({ data, testIdSuffix = "", isPrintMode = false }: PDFDocumentProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const displayLogo = data.logoImage || logoImg;

  // Consistent styling for both preview and PDF
  const pageClasses = "bg-white p-8";
  const textClasses = "text-sm";
  const headingClasses = "text-2xl";
  const logoHeightClasses = "h-14";
  const logoSmallClasses = "h-8";
  const signatureClasses = "h-16";
  const spacingClasses = "space-y-6";
  const spacingSmallClasses = "space-y-4";
  const containerClasses = "space-y-4";
  
  // A4 page dimensions (at 96 DPI)
  const pageStyle = isPrintMode ? {} : {
    minHeight: '297mm',
    width: '210mm',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    margin: '0 auto'
  };

  return (
    <div className={containerClasses}>
      {/* Page 1 - Cover Page with Logo at Top Center */}
      <div className="bg-white overflow-hidden" style={pageStyle}>
        <div className="flex justify-center pt-8 pb-4">
          <img 
            src={displayLogo} 
            alt="Codesmotech" 
            className="h-16"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        <img 
          src={coverPageImg} 
          alt="Offer Letter Cover" 
          className="w-full h-auto"
          style={{ imageRendering: 'crisp-edges' }}
          data-testid={`img-cover-page${testIdSuffix}`}
        />
      </div>

      {/* Page 2 - Offer Details + Terms */}
      <div className={`${pageClasses} ${spacingClasses}`} style={pageStyle}>
        <div className="mb-6">
          <img 
            src={displayLogo} 
            alt="Codesmotech" 
            className="h-10"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        
        <div className={`${spacingSmallClasses} ${textClasses}`}>
          <p><strong>To: {data.salutation} {data.employeeName || "________"}</strong></p>
          <p>{today}</p>
          <p><strong>Dear {data.employeeName ? data.employeeName.split(' ')[0] : "________"},</strong></p>
          <p>Congratulations!</p>
          
          <p>
            On behalf of Codesmotech Technology Consulting Private Limited ("Company"), 
            we are pleased to offer you the position of <strong>{data.position || "________"}</strong>
          </p>
          <p>
            at our {data.location || "________"} location.
          </p>
          
          <p>
            This offer takes effect from your date of joining set i.e.{' '}
            <strong>{formatDate(data.dateOfJoining)}</strong> or any date sooner mutually 
            agreed by both parties, and you are required to accept and attest this letter on or before{' '}
            <strong>{formatDate(data.acceptanceDeadline) || formatDate(data.dateOfJoining)}</strong>.
          </p>
          
          <p>
            Your compensation package will be listed below. 
            The structure of your compensation plan may be altered/edited in the future 
            in line with the compensation policy set forth by the Company.
          </p>
          
          <p>
            As per Company policy, the probation period applicable shall be{' '}
            <strong>{data.probationPeriod || "six (6)"} months</strong>, which may be reduced 
            or extended at the discretion of the Company and as per applicable laws. Your base 
            location will be the {data.location || "________"} office. However, as and when required, 
            your services may be transferred to any of our offices in India or abroad as per 
            business needs.
          </p>
          
          <p>
            All compensation indicated in this letter is subject to continued satisfactory employment. 
            In the event of any disciplinary issues, misconduct, or unsatisfactory performance, the 
            Company reserves the right to terminate employment immediately without notice or 
            compensation, other than what is required by applicable law. This letter constitutes our 
            complete offer package to recognize your new responsibilities and replaces and supersedes 
            in its entirety any other previous offer letter.
          </p>
          
          <p>
            Your appointment is subject to satisfactory reference checks and clearance from any 
            confidentiality/service agreements that you may have executed, which could have a bearing 
            on your employment with us.
          </p>
          
          <p>
            This offer letter is based on the information furnished in your application for 
            employment and during discussions with us. If, at any time in the future, 
            it comes to light that any of this information is incorrect or any relevant information 
            has been withheld, your employment may be terminated without notice.
          </p>
          
          {data.specialClause && (
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded my-4">
              <p className="font-semibold text-sm mb-2">Special Terms & Conditions:</p>
              <p className="whitespace-pre-wrap">{data.specialClause}</p>
            </div>
          )}
        </div>
      </div>

      {/* Page 3 - Documents, Closing & Annexure */}
      <div className={`${pageClasses} ${spacingSmallClasses} ${textClasses}`} style={pageStyle}>
        <div className="mb-6">
          <img 
            src={displayLogo} 
            alt="Codesmotech" 
            className="h-10"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        
        <p className="font-semibold">
          We welcome you to our Company and look forward to your contribution to the global 
          growth of the organization and your professional development.
        </p>
        
        <p>
          <strong>On the date of joining,</strong> please bring (or submit via email, as applicable) 
          the following documents for verification/submission:
        </p>
        
        <ol className="list-decimal pl-8 space-y-1 mb-4" style={{ paddingLeft: '2rem' }}>
          <li className="pl-2">Educational certificates and mark sheets</li>
          <li className="pl-2">Relieving letter and experience certificate from previous employer(s)</li>
          <li className="pl-2">Salary certificate from previous employer</li>
          <li className="pl-2">Passport</li>
          <li className="pl-2">Three passport-size and one stamp-size colored photographs</li>
          <li className="pl-2">A cancelled cheque of your active bank account</li>
        </ol>
        
        <p>Wish you all the best!</p>
        
        <div className="mt-4">
          <p>Yours Sincerely,</p>
          <p>For CodesmoTech Technology Consulting Private Limited</p>
        </div>
        
        <div className="pt-4 mb-8">
          <p>{data.signatoryTitle || "VP, Operations and Finance"}</p>
          {data.signatureImage && (
            <div className="py-1">
              <img 
                src={data.signatureImage} 
                alt="Signature" 
                className={`${signatureClasses} object-contain`}
                data-testid={`img-signature-display${testIdSuffix}`}
              />
            </div>
          )}
          <p className="font-semibold">{data.signatoryName || "Rahul Sharma"}</p>
        </div>
        
        <CompensationTable
          employeeName={data.employeeName}
          position={data.position}
          basicPay={data.basicPay}
          hra={data.hra}
          specialAllowance={data.specialAllowance}
          bonuses={data.bonuses}
          annualCTC={data.annualCTC}
          testIdSuffix={testIdSuffix}
        />
        
        <div className={`mt-8 space-y-4 ${textClasses}`}>
          <p>
            Your individual performance and community outreach will be evaluated across four 
            key areas that are part of our Company's DNA:
          </p>
          
          <ul className="list-disc ml-6 space-y-1">
            <li>Client Intimacy</li>
            <li>Knowledge Sharing and Thought Leadership</li>
            <li>Quality Without Compromise</li>
            <li>People First</li>
          </ul>
          
          <p>
            Our induction program will brief you on our core values and the DNA components 
            mentioned above. Your assigned manager will work with you to develop 
            your annual goals across these four areas.
          </p>
        </div>
      </div>

      {/* Page 5 - Acceptance (forced to new page) */}
      <div 
        className={`${pageClasses} ${spacingClasses}`} 
        style={{
          ...pageStyle,
          pageBreakBefore: 'always',
          breakBefore: 'page',
          pageBreakInside: 'avoid',
          breakInside: 'avoid',
        }}
      >
        <div className="mb-4" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
          <img 
            src={displayLogo} 
            alt="Codesmotech" 
            className="h-10"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        
        <div 
          className="text-center space-y-3 py-4"
          style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
        >
          <h3 className={`${headingClasses} font-bold`}>TO BE FILLED BY THE CONSULTANT</h3>
          <p className="text-lg font-semibold bg-primary/10 p-3 rounded">
            We need your CONFIRMATION
          </p>
        </div>
        
        <div 
          className={`border border-2 rounded-lg p-6 space-y-6 ${textClasses}`}
          style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
        >
          <p>I hereby acknowledge and accept the offer mentioned above.</p>
          
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Signature</p>
              <Separator className="border-t border-t-2" />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Date</p>
              <Separator className="border-t border-t-2" />
            </div>
          </div>
          
          <div className="space-y-2 pt-3">
            <p className="text-sm text-muted-foreground">Name:</p>
            <Separator className="border-t border-t-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
