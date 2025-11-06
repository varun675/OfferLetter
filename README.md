# Codesmotech Offer Letter Generator

A professional web application for generating customized offer letters with Codesmotech branding.

## ✨ Features

- **Smart Form Interface**: Collect employee details with automatic salary breakdown calculation
- **Professional PDF Preview**: 7-page offer letter with branded cover page
- **Signature Capture**: Draw signatures using touchscreen or mouse, or upload signature images
- **Custom Branding**: Upload company logo and configure authorized signatory
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Fully Static**: No backend required - runs 100% in the browser

## 🚀 Quick Start

### Live Demo

Visit the live application: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npx vite build

# Preview production build
npx vite preview
```

## 📋 How to Use

1. **Employee Information**
   - Fill in employee name, position, location, and dates
   - Select appropriate salutation (Mr/Ms/Mrs)

2. **Company Branding**
   - Upload company logo (optional - defaults to Codesmotech logo)
   - Configure signatory title and name (defaults: VP Operations & Finance, Rahul Sharma)
   - Draw or upload authorized signature

3. **Compensation**
   - Enter Annual CTC (automatic breakdown calculation)
   - Add optional bonuses (Retention, Joining, etc.)

4. **Additional Details**
   - Set probation period
   - Add special clauses if needed

5. **Generate PDF**
   - Click "Preview PDF" to see 7-page offer letter
   - Download when ready

## 📄 PDF Structure

1. **Page 1**: Professional cover page
2. **Page 2**: Offer details and addressee
3. **Page 3**: Employment terms and probation
4. **Page 4**: Additional terms and conditions
5. **Page 5**: Closing and signatures
6. **Page 6**: Compensation annexure table
7. **Page 7**: Employee acceptance section

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Hook Form** - Form management
- **Zod** - Validation

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed GitHub Pages deployment instructions.

## 🎨 Customization

### Company Logo
Upload your logo via the "Company Logo" field, or keep the default Codesmotech branding.

### Signatory Details
Modify the signatory title and name fields to match your organization's authorized person.

### Special Clauses
Add custom terms using the "Special Clause" textarea.

## 📝 License

MIT License - feel free to use for your organization.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Note**: This application runs entirely client-side with no data sent to any server. All processing happens in your browser for complete privacy.
