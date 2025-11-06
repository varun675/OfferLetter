import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {children}
      </CardContent>
    </Card>
  );
}
