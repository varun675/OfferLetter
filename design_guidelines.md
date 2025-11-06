# Design Guidelines: Codesmotech Offer Letter Generator

## Design Approach
**Reference-Based Approach**: Professional corporate document applications like DocuSign, HelloSign, and Adobe Sign, adapted to match the provided Codesmotech template aesthetic. This is a utility-focused application prioritizing clarity, efficiency, and professional presentation.

## Core Design Principles
1. **Corporate Professionalism**: Clean, formal interface matching Codesmotech's business identity
2. **Form Clarity**: Clear visual hierarchy for data entry with logical grouping
3. **Template Fidelity**: Generated PDFs must precisely match the provided template design
4. **Efficiency**: Streamlined workflow from input to PDF generation

## Typography System
- **Headings**: Professional sans-serif (Inter, Roboto, or similar)
  - Page Title: text-3xl font-bold
  - Section Headers: text-xl font-semibold
  - Form Labels: text-sm font-medium
- **Body Text**: text-base for form inputs and help text
- **Document Preview**: Match Codesmotech template (likely Times New Roman or similar serif for formal content)

## Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, and 8 (p-4, mb-6, gap-8, etc.)

**Page Structure**:
- Single-page application with centered form container (max-w-4xl)
- Two-column layout for desktop (lg:grid-cols-2) for related fields
- Single column mobile-first design
- Generous padding within sections (p-6 to p-8)
- Consistent vertical spacing between form sections (space-y-6)

## Component Library

### Form Sections
**Section Cards**: 
- Grouped form fields in distinct cards with rounded corners (rounded-lg)
- Section headers with bottom border for separation
- Padding: p-6
- Margin between sections: mb-8

**Input Fields**:
- Full-width text inputs with consistent height (h-12)
- Labels positioned above inputs with mb-2
- Placeholder text for guidance
- Clear focus states with border emphasis
- Required field indicators (asterisk)

**Form Groups**:
1. **Employee Information**: Name, Employee ID, Position, Location
2. **Employment Details**: Date of Joining, Department, Reporting Manager
3. **Compensation Structure**: Basic Pay, HRA, Special Allowance, Probation Period, Acceptance Date
4. **Additional Details**: Any custom fields for specific offer terms

### Action Buttons
- **Primary CTA** (Generate PDF): Large, prominent button (px-8 py-3, text-lg)
- **Secondary Actions** (Preview, Clear Form): Outlined style, smaller prominence
- Button group aligned right or centered based on context
- Disabled state for incomplete forms

### Preview Component
- Collapsible preview panel showing document structure
- Miniature page thumbnails or text-based preview
- Edit capability to return to form sections
- Clear visual separation from input form

### PDF Generation Indicator
- Loading state with professional spinner
- Success confirmation with download prompt
- Filename display: "EmployeeName_DateOfJoining.pdf"
- Option to generate another letter

## Layout Specifications

**Header**:
- Codesmotech logo (left-aligned or centered)
- Application title: "Offer Letter Generator"
- Clean, minimal header with subtle bottom border
- Height: h-16 to h-20

**Main Content Area**:
- Container: max-w-4xl mx-auto
- Padding: px-6 py-12
- Background treatment for form area vs. page background

**Form Layout**:
- Progressive disclosure: Show sections sequentially or all at once based on complexity
- Clear visual flow from top to bottom
- Sticky action buttons for long forms (optional floating generate button)

**Responsive Behavior**:
- Desktop (lg): Two-column grid for compact field pairs
- Tablet (md): Single column with comfortable spacing
- Mobile: Fully stacked with increased touch targets (min-height: 48px)

## PDF Template Matching
The generated PDF must replicate the Codesmotech template exactly:
- Company logo positioning and size
- Multi-page structure with page numbers
- Formal letter formatting with proper margins
- Salary annexure table with exact column structure
- Signature blocks and acceptance section
- Footer with company details on each page

## Navigation & Flow
1. **Form Entry Phase**: Clear, guided data entry
2. **Review Phase**: Preview generated content before PDF creation
3. **Generation Phase**: Loading state with progress indication
4. **Download Phase**: Success state with download action and option to create another

## Accessibility
- Proper label associations for all form fields
- Keyboard navigation support throughout
- Clear error states with descriptive messages
- ARIA labels for dynamic content (loading, success states)
- Sufficient color contrast for all text elements

## No Images Required
This is a form-based application without hero images or decorative photography. Focus on clean interface design, clear typography, and professional form presentation.