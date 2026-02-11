# CodeRefine - AI-Powered Code Review & Optimization

A modern, professional web application for analyzing, reviewing, and optimizing code using AI-powered insights.

## 🌟 Features

### Core Functionality
- **Multi-Language Support**: Analyze code in 12+ programming languages including JavaScript, Python, Java, C++, Go, Rust, and more
- **Code Editor**: Syntax-friendly code input area with line numbers and file upload support
- **Real-time Analysis**: Get instant feedback on code quality, bugs, security issues, and performance
- **Optimized Code Generation**: Receive improved, refactored code with best practices applied
- **Interactive Results**: View detailed analysis across multiple categories with clear explanations

### User Interface
- **Modern Design**: Clean, professional interface with smooth animations and transitions
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Dark Theme**: Eye-friendly dark color scheme optimized for developers
- **Visual Feedback**: Real-time statistics, progress indicators, and interactive components
- **Tab Navigation**: Organized results across Issues, Security, Performance, and Optimized Code tabs

### Additional Features
- **File Upload**: Drag and drop or upload code files directly
- **Export Reports**: Download analysis results as JSON for record-keeping
- **Copy to Clipboard**: One-click copying of optimized code
- **Keyboard Shortcuts**: Power-user shortcuts for common actions
- **Auto Language Detection**: Automatically detect programming language from file extension

## 📁 File Structure

```
coderefine/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── script.js           # Interactive functionality and logic
└── README.md           # Documentation (this file)
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Local web server for development

### Installation

1. **Download the files**:
   - Download `index.html`, `styles.css`, and `script.js`
   - Place all three files in the same directory

2. **Open the application**:
   - Simply double-click `index.html` to open in your default browser
   - OR use a local server (recommended for development):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js with http-server
     npx http-server
     ```

3. **Access the application**:
   - Open your browser and navigate to the file location
   - If using a server: `http://localhost:8000`

## 💡 How to Use

### Analyzing Code

1. **Input Your Code**:
   - Paste code directly into the editor, OR
   - Click "Upload File" to select a code file from your computer
   
2. **Select Language**:
   - Choose your programming language from the dropdown menu
   - The language is auto-detected when uploading files

3. **Run Analysis**:
   - Click the "Analyze Code" button
   - Or use keyboard shortcut: `Ctrl/Cmd + Enter`

4. **View Results**:
   - Review the summary cards showing issues, security alerts, and optimizations
   - Navigate through tabs to see detailed findings
   - Check the "Optimized Code" tab for improved version

5. **Take Action**:
   - Copy the optimized code using the "Copy Code" button
   - Export the full report as JSON for documentation
   - Apply suggested fixes to your original code

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Analyze code
- `Ctrl/Cmd + K` - Clear editor
- `Tab` - Insert 4 spaces (in code editor)

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --color-accent-primary: #00d4ff;    /* Primary accent color */
    --color-accent-secondary: #7c3aed;  /* Secondary accent */
    --color-bg-primary: #0a0e27;        /* Background color */
    /* ... more variables */
}
```

### Modifying Fonts

The application uses:
- **Display Font**: Sora (headings, UI elements)
- **Monospace Font**: JetBrains Mono (code editor)

To change fonts, update the Google Fonts link in `index.html` and the CSS variables in `styles.css`.

### Adding New Languages

Add languages to the dropdown in `index.html`:

```html
<select id="language-select" class="language-select">
    <option value="your-language">Your Language</option>
    <!-- Add more options -->
</select>
```

Update the file extension mapping in `script.js`:

```javascript
const languageMap = {
    'ext': 'your-language',
    // Add more mappings
};
```

## 🔧 Integration with AI Services

### Current Implementation
The application currently uses **mock data** for demonstration purposes. To integrate with a real AI analysis service:

### Backend Integration Steps

1. **Set up an API endpoint**:
   ```javascript
   async function analyzeCodeWithAPI(code, language) {
       const response = await fetch('YOUR_API_ENDPOINT', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer YOUR_API_KEY'
           },
           body: JSON.stringify({ code, language })
       });
       return await response.json();
   }
   ```

2. **Replace the mock function** in `script.js`:
   ```javascript
   // Replace getMockAnalysisData() with API call
   const analysis = await analyzeCodeWithAPI(code, language);
   ```

3. **Expected API Response Format**:
   ```json
   {
       "issues": [
           {
               "title": "Issue title",
               "severity": "high|medium|low",
               "description": "Detailed description",
               "location": "Line 5",
               "code": "problematic code snippet",
               "suggestion": "How to fix it"
           }
       ],
       "security": [...],
       "performance": [...],
       "optimized": "complete optimized code",
       "stats": {
           "issuesCount": 3,
           "securityCount": 1,
           "optimizationsCount": 2,
           "qualityScore": "B+"
       }
   }
   ```

## 🌐 Deployment

### GitHub Pages
1. Create a GitHub repository
2. Push the files to the main branch
3. Enable GitHub Pages in repository settings
4. Access via: `https://yourusername.github.io/repository-name`

### Netlify
1. Create account on [Netlify](https://netlify.com)
2. Drag and drop your project folder
3. Get instant deployment

### Vercel
1. Create account on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click

## 🔒 Security Considerations

When integrating with real AI services:

1. **Never expose API keys** in frontend code
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** to prevent abuse
4. **Validate and sanitize** user input
5. **Use HTTPS** for all API communications
6. **Implement authentication** if handling user data

## 🎯 Features Roadmap

### Planned Features
- [ ] User authentication and saved analysis history
- [ ] Real-time collaborative code review
- [ ] Custom rule configuration
- [ ] Support for project-wide analysis
- [ ] Integration with GitHub/GitLab
- [ ] Code comparison (before/after)
- [ ] Custom themes and color schemes
- [ ] PDF report generation
- [ ] AI chat for code questions

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects.

## 🙏 Acknowledgments

- Font: [Sora](https://fonts.google.com/specimen/Sora) by Jonny Pinhorn
- Monospace Font: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- Icons: Custom SVG icons
- Inspiration: Modern developer tools and AI-powered code analysis platforms

## 📧 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Contact: your-email@example.com

## 🔄 Version History

### Version 1.0.0 (Current)
- Initial release
- Multi-language support
- Mock analysis functionality
- Responsive design
- Export and copy features

---

**Built with ❤️ for developers by developers**
