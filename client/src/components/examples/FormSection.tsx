import FormSection from '../FormSection';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormSectionExample() {
  return (
    <div className="p-6 max-w-2xl">
      <FormSection 
        title="Employee Information" 
        description="Enter the basic details of the employee"
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter employee name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input id="position" placeholder="Enter position" />
          </div>
        </div>
      </FormSection>
    </div>
  );
}
