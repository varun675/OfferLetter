import OfferLetterForm from "@/components/OfferLetterForm";
import logoImg from "@assets/generated_images/Codesmotech_company_logo_587f1306.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <img 
                src={logoImg} 
                alt="Codesmotech" 
                className="h-16 md:h-20 object-contain"
                data-testid="img-logo"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-title">
              Offer Letter Generator
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto" data-testid="text-description">
              Create professional offer letters for CodesmoTech Technology Consulting Private Limited with customizable employee details and compensation packages.
            </p>
          </div>

          <OfferLetterForm />

          <div className="text-center text-sm text-muted-foreground pt-8">
            <p data-testid="text-footer">
              © {new Date().getFullYear()} CodesmoTech Technology Consulting Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
