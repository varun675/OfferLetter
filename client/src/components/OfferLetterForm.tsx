import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSection from "./FormSection";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface OfferLetterData {
  employeeName: string;
  position: string;
  location: string;
  dateOfJoining: string;
  acceptanceDeadline: string;
  basicPay: string;
  hra: string;
  specialAllowance: string;
  probationPeriod: string;
}

interface OfferLetterFormProps {
  onGenerate?: (data: OfferLetterData) => void;
}

export default function OfferLetterForm({ onGenerate }: OfferLetterFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<OfferLetterData>({
    employeeName: "",
    position: "",
    location: "",
    dateOfJoining: "",
    acceptanceDeadline: "",
    basicPay: "",
    hra: "",
    specialAllowance: "",
    probationPeriod: "6",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field: keyof OfferLetterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotals = () => {
    const basic = parseFloat(formData.basicPay) || 0;
    const hraVal = parseFloat(formData.hra) || 0;
    const special = parseFloat(formData.specialAllowance) || 0;
    
    const totalFixed = basic + hraVal + special;
    const totalCTC = totalFixed;
    
    return {
      totalFixed,
      totalCTC,
      basicPerAnnum: basic * 12,
      hraPerAnnum: hraVal * 12,
      specialPerAnnum: special * 12,
      totalPerAnnum: totalCTC * 12,
    };
  };

  const totals = calculateTotals();

  const handleSubmit = (e: React.FormEvent) => {
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
    
    setTimeout(() => {
      console.log('Generate PDF with data:', formData);
      
      if (onGenerate) {
        onGenerate(formData);
      }
      
      toast({
        title: "Offer Letter Generated",
        description: `PDF ready: ${formData.employeeName.replace(/\s+/g, '_')}_${formData.dateOfJoining.replace(/\//g, '-')}.pdf`,
      });
      
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormSection 
        title="Employee Information" 
        description="Enter the basic details of the employee"
      >
        <div className="grid gap-6 md:grid-cols-2">
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
        title="Compensation Structure" 
        description="Enter monthly compensation details"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="basicPay" data-testid="label-basicPay">
              Basic Pay (Monthly)
            </Label>
            <Input
              id="basicPay"
              data-testid="input-basicPay"
              type="number"
              placeholder="30000"
              value={formData.basicPay}
              onChange={(e) => handleChange("basicPay", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hra" data-testid="label-hra">
              House Rent Allowance (Monthly)
            </Label>
            <Input
              id="hra"
              data-testid="input-hra"
              type="number"
              placeholder="9666"
              value={formData.hra}
              onChange={(e) => handleChange("hra", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialAllowance" data-testid="label-specialAllowance">
              Special Allowance (Monthly)
            </Label>
            <Input
              id="specialAllowance"
              data-testid="input-specialAllowance"
              type="number"
              placeholder="14500"
              value={formData.specialAllowance}
              onChange={(e) => handleChange("specialAllowance", e.target.value)}
            />
          </div>
        </div>

        {(formData.basicPay || formData.hra || formData.specialAllowance) && (
          <div className="mt-6 p-4 bg-muted rounded-lg space-y-3" data-testid="compensation-summary">
            <h4 className="font-semibold text-sm">Compensation Summary</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Total Fixed (Monthly)</p>
                <p className="font-semibold" data-testid="text-totalMonthly">
                  ₹{totals.totalFixed.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Total CTC (Annual)</p>
                <p className="font-semibold text-primary" data-testid="text-totalAnnual">
                  ₹{totals.totalPerAnnum.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        )}
      </FormSection>

      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          data-testid="button-preview"
          onClick={() => {
            console.log('Preview clicked', formData);
            toast({
              title: "Preview",
              description: "Preview functionality will be available soon",
            });
          }}
        >
          <FileText className="w-4 h-4 mr-2" />
          Preview
        </Button>
        
        <Button 
          type="submit" 
          data-testid="button-generate"
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
  );
}
