// api-service.js - Example API Integration
// This file demonstrates how to integrate with a real AI code analysis backend

class CodeAnalysisAPI {
    constructor(config) {
        this.baseUrl = config.api.baseUrl;
        this.apiKey = config.api.apiKey;
        this.timeout = config.api.timeout;
        this.retryConfig = config.api.retry;
    }
    
    /**
     * Analyze code with AI backend
     * @param {string} code - The code to analyze
     * @param {string} language - Programming language
     * @returns {Promise<Object>} - Analysis results
     */
    async analyzeCode(code, language) {
        try {
            const response = await this.makeRequest('/analyze', {
                method: 'POST',
                body: JSON.stringify({
                    code,
                    language,
                    analysisOptions: {
                        checkBugs: true,
                        checkSecurity: true,
                        checkPerformance: true,
                        generateOptimized: true
                    }
                })
            });
            
            return this.transformResponse(response);
        } catch (error) {
            console.error('Analysis failed:', error);
            throw new Error('Failed to analyze code. Please try again.');
        }
    }
    
    /**
     * Make HTTP request with retry logic
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} - Response data
     */
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
                'X-Client-Version': '1.0.0'
            }
        };
        
        const requestOptions = { ...defaultOptions, ...options };
        
        let lastError;
        for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);
                
                const response = await fetch(url, {
                    ...requestOptions,
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                return await response.json();
            } catch (error) {
                lastError = error;
                
                if (attempt < this.retryConfig.maxRetries) {
                    await this.delay(this.retryConfig.retryDelay * (attempt + 1));
                }
            }
        }
        
        throw lastError;
    }
    
    /**
     * Transform API response to application format
     * @param {Object} apiResponse - Raw API response
     * @returns {Object} - Transformed response
     */
    transformResponse(apiResponse) {
        // Transform the API response to match the application's expected format
        return {
            issues: this.transformIssues(apiResponse.issues || []),
            security: this.transformIssues(apiResponse.security || []),
            performance: this.transformIssues(apiResponse.performance || []),
            optimized: apiResponse.optimizedCode || '',
            stats: {
                issuesCount: (apiResponse.issues || []).length,
                securityCount: (apiResponse.security || []).length,
                optimizationsCount: (apiResponse.performance || []).length,
                qualityScore: this.calculateQualityScore(apiResponse)
            }
        };
    }
    
    /**
     * Transform issues to application format
     * @param {Array} issues - Raw issues from API
     * @returns {Array} - Transformed issues
     */
    transformIssues(issues) {
        return issues.map(issue => ({
            title: issue.title || issue.message,
            severity: issue.severity.toLowerCase(),
            description: issue.description || issue.details,
            location: issue.location || `Line ${issue.line || 'Unknown'}`,
            code: issue.codeSnippet || '',
            suggestion: issue.recommendation || issue.fix || ''
        }));
    }
    
    /**
     * Calculate overall code quality score
     * @param {Object} apiResponse - API response
     * @returns {string} - Quality score (A+, A, B+, etc.)
     */
    calculateQualityScore(apiResponse) {
        const totalIssues = 
            (apiResponse.issues || []).length +
            (apiResponse.security || []).length +
            (apiResponse.performance || []).length;
        
        const highSeverity = this.countSeverity(apiResponse, 'high');
        const mediumSeverity = this.countSeverity(apiResponse, 'medium');
        
        if (totalIssues === 0) return 'A+';
        if (highSeverity === 0 && totalIssues <= 2) return 'A';
        if (highSeverity === 0 && totalIssues <= 5) return 'B+';
        if (highSeverity <= 1 && totalIssues <= 8) return 'B';
        if (highSeverity <= 2) return 'C+';
        return 'C';
    }
    
    /**
     * Count issues by severity
     * @param {Object} apiResponse - API response
     * @param {string} severity - Severity level to count
     * @returns {number} - Count of issues
     */
    countSeverity(apiResponse, severity) {
        const allIssues = [
            ...(apiResponse.issues || []),
            ...(apiResponse.security || []),
            ...(apiResponse.performance || [])
        ];
        
        return allIssues.filter(issue => 
            issue.severity.toLowerCase() === severity
        ).length;
    }
    
    /**
     * Delay helper for retry logic
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Validate code before sending to API
     * @param {string} code - Code to validate
     * @param {string} language - Programming language
     * @returns {Object} - Validation result
     */
    validateInput(code, language) {
        const errors = [];
        
        if (!code || code.trim().length === 0) {
            errors.push('Code cannot be empty');
        }
        
        if (code.length > 50000) {
            errors.push('Code exceeds maximum length of 50,000 characters');
        }
        
        const supportedLanguages = [
            'javascript', 'python', 'java', 'cpp', 'csharp',
            'go', 'rust', 'typescript', 'php', 'ruby', 'swift', 'kotlin'
        ];
        
        if (!supportedLanguages.includes(language)) {
            errors.push(`Unsupported language: ${language}`);
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

// Example usage:
/*
// Initialize the API service
const apiService = new CodeAnalysisAPI(CONFIG);

// Analyze code
async function analyzeUserCode() {
    const code = document.getElementById('code-input').value;
    const language = document.getElementById('language-select').value;
    
    // Validate input
    const validation = apiService.validateInput(code, language);
    if (!validation.isValid) {
        alert(validation.errors.join('\n'));
        return;
    }
    
    // Show loading state
    showLoading();
    
    try {
        // Call API
        const results = await apiService.analyzeCode(code, language);
        
        // Display results
        displayResults(results);
    } catch (error) {
        alert('Analysis failed: ' + error.message);
    } finally {
        hideLoading();
    }
}
*/

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeAnalysisAPI;
}
