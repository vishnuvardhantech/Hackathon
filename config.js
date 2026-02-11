// config.js - Configuration Template for API Integration
// Copy this file and rename to config.local.js (add to .gitignore)

const CONFIG = {
    // API Configuration
    api: {
        // Base URL for your AI code analysis API
        baseUrl: 'https://api.yourservice.com/v1',
        
        // API Key (NEVER commit this to version control)
        // Use environment variables in production
        apiKey: process.env.API_KEY || 'your-api-key-here',
        
        // Request timeout in milliseconds
        timeout: 30000,
        
        // Retry configuration
        retry: {
            maxRetries: 3,
            retryDelay: 1000
        }
    },
    
    // Analysis Settings
    analysis: {
        // Maximum code length (in characters)
        maxCodeLength: 50000,
        
        // Supported languages
        supportedLanguages: [
            'javascript',
            'python',
            'java',
            'cpp',
            'csharp',
            'go',
            'rust',
            'typescript',
            'php',
            'ruby',
            'swift',
            'kotlin'
        ],
        
        // Analysis categories to enable
        categories: {
            bugs: true,
            security: true,
            performance: true,
            codeStyle: true,
            bestPractices: true
        },
        
        // Severity levels to include
        severityLevels: ['high', 'medium', 'low']
    },
    
    // UI Configuration
    ui: {
        // Animation duration
        animationDuration: 300,
        
        // Maximum file upload size (in bytes)
        maxFileSize: 1024 * 1024 * 5, // 5MB
        
        // Auto-save interval (in milliseconds)
        autoSaveInterval: 30000,
        
        // Theme
        theme: 'dark' // 'dark' or 'light'
    },
    
    // Feature Flags
    features: {
        enableFileUpload: true,
        enableExport: true,
        enableRealTimeAnalysis: false,
        enableCollaboration: false,
        enableHistory: false
    },
    
    // Analytics (optional)
    analytics: {
        enabled: false,
        trackingId: 'YOUR-GA-ID'
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
