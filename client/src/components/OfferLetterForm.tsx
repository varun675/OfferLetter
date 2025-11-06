import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSection from "./FormSection";
import CompensationTable from "./CompensationTable";
import PDFPreview from "./PDFPreview";
import { FileText, Download, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BonusField {
  label: string;
  amount: string;
}

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
  bonuses: BonusField[];
}

interface OfferLetterFormProps {
  onGenerate?: (data: OfferLetterData) => void;
}

export default function OfferLetterForm({ onGenerate }: OfferLetterFormProps) {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<OfferLetterData>({
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
      { label: "Retention Bonus", amount: "" }
    ],
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field: keyof Omit<OfferLetterData, 'bonuses'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    <>
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
          description="Enter monthly compensation details and bonuses"
        >
          <div className="grid gap-6 md:grid-cols-3">
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
                House Rent Allowance
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
                Special Allowance
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

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            data-testid="button-preview"
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
