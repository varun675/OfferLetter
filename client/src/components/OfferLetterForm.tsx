import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormSection from "./FormSection";
import CompensationTable from "./CompensationTable";
import PDFPreview from "./PDFPreview";
import PDFDocument from "./PDFDocument";
import SignaturePad from "./SignaturePad";
import { FileText, Download, Plus, Trash2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";

interface BonusField {
  label: string;
  amount: string;
}

export interface OfferLetterData {
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
}

interface OfferLetterFormProps {
  onGenerate?: (data: OfferLetterData) => void;
}

export default function OfferLetterForm({ onGenerate }: OfferLetterFormProps) {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<OfferLetterData>({
    salutation: "Mr",
    employeeName: "Roshan Saroj",
    position: "Digital Consultant",
    location: "Gurgaon",
    dateOfJoining: "2025-11-06",
    acceptanceDeadline: "2025-11-05",
    annualCTC: "650000",
    basicPay: "",
    hra: "",
    specialAllowance: "",
    probationPeriod: "6",
    specialClause: "",
    logoImage: "",
    signatoryTitle: "VP, Operations and Finance",
    signatoryName: "Rahul Sharma",
    signatureImage: "",
    bonuses: [
      { label: "Retention Bonus", amount: "" }
    ],
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Calculate breakdown on initial load if annualCTC is present
  useEffect(() => {
    if (formData.annualCTC && !formData.basicPay) {
      const breakdown = calculateBreakdown(formData.annualCTC);
      setFormData(prev => ({ ...prev, ...breakdown }));
    }
  }, []);

  const calculateBreakdown = (annualCTC: string) => {
    const ctc = parseFloat(annualCTC) || 0;
    if (ctc === 0) {
      return { basicPay: "", hra: "", specialAllowance: "" };
    }
    
    // Calculate monthly CTC
    const monthlyCTC = ctc / 12;
    
    // Standard breakdown:
    // Basic Pay: 46.15% of monthly CTC (30000/65000)
    // HRA: 14.87% of monthly CTC (9666/65000)
    // Special Allowance: 39% of monthly CTC (remainder)
    const basicPay = Math.round(monthlyCTC * 0.4615);
    const hra = Math.round(monthlyCTC * 0.1487);
    const specialAllowance = Math.round(monthlyCTC - basicPay - hra);
    
    return {
      basicPay: basicPay.toString(),
      hra: hra.toString(),
      specialAllowance: specialAllowance.toString(),
    };
  };

  const handleChange = (field: keyof Omit<OfferLetterData, 'bonuses'>, value: string) => {
    if (field === 'annualCTC') {
      const breakdown = calculateBreakdown(value);
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        ...breakdown
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleBonusChange = (index: number, field: keyof BonusField, value: string) => {
    setFormData(prev => ({
      ...prev,
      bonuses: prev.bonuses.map((bonus, i) => 
        i === index ? { ...bonus, [field]: value } : bonus
      )
    }));
  };

  const addBonus = () => {
    setFormData(prev => ({
      ...prev,
      bonuses: [...prev.bonuses, { label: "", amount: "" }]
    }));
  };

  const removeBonus = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bonuses: prev.bonuses.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (field: 'logoImage' | 'signatureImage', file: File | null) => {
    if (!file) {
      setFormData(prev => ({ ...prev, [field]: "" }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, [field]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employeeName || !formData.position || !formData.dateOfJoining) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, position, and date of joining).",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Open preview dialog first
      setShowPreview(true);
      
      // Wait for dialog to render
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the scroll area (which already has the correct height!)
      const scrollArea = document.querySelector('[data-testid="dialog-pdf-preview"] .overflow-auto') as HTMLElement;
      if (!scrollArea) {
        throw new Error('Preview content not found');
      }
      
      // Store original styles
      const originalOverflow = scrollArea.style.overflow;
      const originalMaxHeight = scrollArea.style.maxHeight;
      const originalHeight = scrollArea.style.height;
      const originalWidth = scrollArea.style.width;
      
      // Temporarily remove scroll restrictions so all content is visible
      scrollArea.style.overflow = 'visible';
      scrollArea.style.maxHeight = 'none';
      scrollArea.style.height = 'auto';
      // Set explicit width for PDF generation (A4 width in pixels at 96dpi ≈ 794px)
      scrollArea.style.width = '794px';
      
      // Find all tables and set explicit widths for PDF generation
      const tables = scrollArea.querySelectorAll('table');
      const originalTableStyles: { width: string; tableLayout: string }[] = [];
      tables.forEach((table) => {
        const htmlTable = table as HTMLElement;
        originalTableStyles.push({
          width: htmlTable.style.width,
          tableLayout: htmlTable.style.tableLayout
        });
        htmlTable.style.width = '750px';
        htmlTable.style.tableLayout = 'fixed';
      });
      
      // Wait for layout to adjust
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate filename: EmployeeName_DateOfJoining.pdf
      const fileName = `${formData.employeeName.replace(/\s+/g, '_')}_${formData.dateOfJoining}.pdf`;

      // Configure html2pdf options
      const options = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: fileName,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          scrollY: 0,
          scrollX: 0,
          windowHeight: scrollArea.scrollHeight + 200
        },
        jsPDF: { 
          unit: 'mm' as const, 
          format: 'a4' as const, 
          orientation: 'portrait' as const,
          compress: true
        },
        pagebreak: { 
          mode: ['css', 'legacy'],
          avoid: ['div', 'img']
        }
      };

      // Generate and download PDF (capture the scrollArea itself)
      await html2pdf().set(options).from(scrollArea).save();
      
      // Restore original scroll styles
      scrollArea.style.overflow = originalOverflow;
      scrollArea.style.maxHeight = originalMaxHeight;
      scrollArea.style.height = originalHeight;
      scrollArea.style.width = originalWidth;
      
      // Restore original table styles
      tables.forEach((table, index) => {
        const htmlTable = table as HTMLElement;
        htmlTable.style.width = originalTableStyles[index].width;
        htmlTable.style.tableLayout = originalTableStyles[index].tableLayout;
      });
      
      // Close dialog
      setShowPreview(false);

      if (onGenerate) {
        onGenerate(formData);
      }

      toast({
        title: "PDF Generated Successfully",
        description: `Downloaded: ${fileName}`,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-8">
        <FormSection 
          title="Employee Information" 
          description="Enter the basic details of the employee"
        >
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="salutation" data-testid="label-salutation">
                Salutation <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.salutation}
                onValueChange={(value) => handleChange("salutation", value)}
              >
                <SelectTrigger id="salutation" data-testid="select-salutation">
                  <SelectValue placeholder="Select salutation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr" data-testid="option-mr">Mr</SelectItem>
                  <SelectItem value="Ms" data-testid="option-ms">Ms</SelectItem>
                  <SelectItem value="Mrs" data-testid="option-mrs">Mrs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeName" data-testid="label-employeeName">
                Employee Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="employeeName"
                data-testid="input-employeeName"
                placeholder="e.g., Roshan Saroj"
                value={formData.employeeName}
                onChange={(e) => handleChange("employeeName", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position" data-testid="label-position">
                Position <span className="text-destructive">*</span>
              </Label>
              <Input
                id="position"
                data-testid="input-position"
                placeholder="e.g., Digital Consultant"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" data-testid="label-location">
                Location
              </Label>
              <Input
                id="location"
                data-testid="input-location"
                placeholder="e.g., Gurgaon"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfJoining" data-testid="label-dateOfJoining">
                Date of Joining <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dateOfJoining"
                data-testid="input-dateOfJoining"
                type="date"
                value={formData.dateOfJoining}
                onChange={(e) => handleChange("dateOfJoining", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="acceptanceDeadline" data-testid="label-acceptanceDeadline">
                Acceptance Deadline
              </Label>
              <Input
                id="acceptanceDeadline"
                data-testid="input-acceptanceDeadline"
                type="date"
                value={formData.acceptanceDeadline}
                onChange={(e) => handleChange("acceptanceDeadline", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="probationPeriod" data-testid="label-probationPeriod">
                Probation Period (months)
              </Label>
              <Input
                id="probationPeriod"
                data-testid="input-probationPeriod"
                type="number"
                min="0"
                max="12"
                placeholder="6"
                value={formData.probationPeriod}
                onChange={(e) => handleChange("probationPeriod", e.target.value)}
              />
            </div>
          </div>
        </FormSection>

        <FormSection 
          title="Company Branding & Signatory" 
          description="Upload company logo and configure authorized signatory details"
        >
          <div className="space-y-6">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label htmlFor="logoUpload" data-testid="label-logo">
                Company Logo
              </Label>
              <div className="space-y-3">
                <Input
                  id="logoUpload"
                  type="file"
                  accept="image/*"
                  data-testid="input-logo"
                  onChange={(e) => handleFileUpload('logoImage', e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                {formData.logoImage && (
                  <div className="relative inline-block">
                    <img 
                      src={formData.logoImage} 
                      alt="Company Logo Preview" 
                      className="h-16 object-contain border rounded p-2"
                      data-testid="preview-logo"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground"
                      onClick={() => setFormData(prev => ({ ...prev, logoImage: "" }))}
                      data-testid="button-remove-logo"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Upload your company logo (recommended: PNG with transparent background)
              </p>
            </div>

            {/* Signatory Information */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="signatoryTitle" data-testid="label-signatoryTitle">
                  Signatory Title
                </Label>
                <Input
                  id="signatoryTitle"
                  data-testid="input-signatoryTitle"
                  placeholder="e.g., VP, Operations and Finance"
                  value={formData.signatoryTitle}
                  onChange={(e) => handleChange("signatoryTitle", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Job title of the person signing the offer letter
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signatoryName" data-testid="label-signatoryName">
                  Signatory Name
                </Label>
                <Input
                  id="signatoryName"
                  data-testid="input-signatoryName"
                  placeholder="e.g., Rahul Sharma"
                  value={formData.signatoryName}
                  onChange={(e) => handleChange("signatoryName", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Full name of the authorized signatory
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Label data-testid="label-signature">
                Authorized Signature
              </Label>
              
              <div className="space-y-4">
                {/* Signature Pad */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Draw Signature (Touchscreen/Mouse)</p>
                  <SignaturePad 
                    onSave={(signatureData) => setFormData(prev => ({ ...prev, signatureImage: signatureData }))}
                    existingSignature={formData.signatureImage}
                  />
                </div>

                {/* OR Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or Upload</span>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Upload Signature Image</p>
                  <Input
                    id="signatureUpload"
                    type="file"
                    accept="image/*"
                    data-testid="input-signature"
                    onChange={(e) => handleFileUpload('signatureImage', e.target.files?.[0] || null)}
                    className="cursor-pointer"
                  />
                </div>

                {/* Preview */}
                {formData.signatureImage && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Current Signature:</p>
                    <div className="relative inline-block">
                      <img 
                        src={formData.signatureImage} 
                        alt="Signature Preview" 
                        className="h-20 object-contain border rounded p-2 bg-white"
                        data-testid="preview-signature"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground"
                        onClick={() => setFormData(prev => ({ ...prev, signatureImage: "" }))}
                        data-testid="button-remove-signature"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Signature of {formData.signatoryName || "authorized signatory"}
              </p>
            </div>
          </div>
        </FormSection>

        <FormSection 
          title="Compensation Structure" 
          description="Enter annual CTC and bonuses (breakdown will be calculated automatically)"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="annualCTC" data-testid="label-annualCTC">
                Annual CTC (Cost to Company) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="annualCTC"
                data-testid="input-annualCTC"
                type="number"
                placeholder="650000"
                value={formData.annualCTC}
                onChange={(e) => handleChange("annualCTC", e.target.value)}
                className="text-lg font-semibold"
              />
              <p className="text-sm text-muted-foreground">
                Enter the total annual package (excluding bonuses)
              </p>
            </div>

            {formData.annualCTC && parseFloat(formData.annualCTC) > 0 && (
              <div className="p-4 bg-muted rounded-lg space-y-3" data-testid="breakdown-summary">
                <h4 className="font-semibold text-sm">Compensation Breakdown (Monthly)</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Basic Pay</p>
                    <p className="font-semibold" data-testid="text-basic-breakdown">
                      ₹{parseFloat(formData.basicPay || "0").toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">HRA</p>
                    <p className="font-semibold" data-testid="text-hra-breakdown">
                      ₹{parseFloat(formData.hra || "0").toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Special Allowance</p>
                    <p className="font-semibold" data-testid="text-special-breakdown">
                      ₹{parseFloat(formData.specialAllowance || "0").toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Monthly Total</p>
                    <p className="font-bold text-primary" data-testid="text-monthly-total">
                      ₹{(parseFloat(formData.annualCTC || "0") / 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <Label className="text-base">Bonuses (Optional)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addBonus}
                data-testid="button-add-bonus"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Bonus
              </Button>
            </div>

            {formData.bonuses.map((bonus, index) => (
              <div key={index} className="grid gap-4 md:grid-cols-[1fr,1fr,auto] items-end p-4 bg-muted rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor={`bonus-label-${index}`}>
                    Bonus Type
                  </Label>
                  <Input
                    id={`bonus-label-${index}`}
                    data-testid={`input-bonus-label-${index}`}
                    placeholder="e.g., Retention Bonus, Joining Bonus"
                    value={bonus.label}
                    onChange={(e) => handleBonusChange(index, "label", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`bonus-amount-${index}`}>
                    Amount (Annual)
                  </Label>
                  <Input
                    id={`bonus-amount-${index}`}
                    data-testid={`input-bonus-amount-${index}`}
                    type="number"
                    placeholder="100000"
                    value={bonus.amount}
                    onChange={(e) => handleBonusChange(index, "amount", e.target.value)}
                  />
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBonus(index)}
                  data-testid={`button-remove-bonus-${index}`}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </FormSection>

        <FormSection 
          title="Special Clauses (Optional)" 
          description="Add any special terms or conditions for this offer"
        >
          <div className="space-y-2">
            <Label htmlFor="specialClause" data-testid="label-specialClause">
              Special Terms & Conditions
            </Label>
            <Textarea
              id="specialClause"
              data-testid="input-specialClause"
              placeholder="e.g., This position requires international travel up to 30% of the time. The candidate will be eligible for performance bonus after successful completion of probation period."
              value={formData.specialClause}
              onChange={(e) => handleChange("specialClause", e.target.value)}
              rows={5}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground">
              This clause will appear in the offer letter before the welcome message
            </p>
          </div>
        </FormSection>

        {(formData.employeeName || formData.basicPay) && (
          <div data-testid="section-table-preview">
            <CompensationTable
              employeeName={formData.employeeName}
              position={formData.position}
              basicPay={formData.basicPay}
              hra={formData.hra}
              specialAllowance={formData.specialAllowance}
              bonuses={formData.bonuses}
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            data-testid="button-preview"
            className="w-full sm:w-auto"
            onClick={() => {
              if (!formData.employeeName || !formData.position || !formData.dateOfJoining) {
                toast({
                  title: "Missing Information",
                  description: "Please fill in required fields to preview.",
                  variant: "destructive",
                });
                return;
              }
              setShowPreview(true);
            }}
          >
            <FileText className="w-4 h-4 mr-2" />
            Preview PDF
          </Button>
          
          <Button 
            type="submit" 
            data-testid="button-generate"
            className="w-full sm:w-auto"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>Generating...</>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Generate PDF
              </>
            )}
          </Button>
        </div>
      </form>

      <PDFPreview 
        open={showPreview} 
        onOpenChange={setShowPreview} 
        data={formData}
      />
    </>
  );
}
