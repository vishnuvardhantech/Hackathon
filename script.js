// ===================================
// DOM Elements
// ===================================
const codeInput = document.getElementById('code-input');
const languageSelect = document.getElementById('language-select');
const lineNumbers = document.getElementById('line-numbers');
const lineCount = document.getElementById('line-count');
const charCount = document.getElementById('char-count');
const selectedLanguage = document.getElementById('selected-language');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');
const clearBtn = document.getElementById('clear-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const loadingState = document.getElementById('loading-state');
const progressBar = document.getElementById('progress-bar');
const resultsSection = document.getElementById('results-section');
const exportBtn = document.getElementById('export-btn');
const copyOptimizedBtn = document.getElementById('copy-optimized-btn');

// Summary card values
const issuesCountEl = document.getElementById('issues-count');
const securityCountEl = document.getElementById('security-count');
const optimizationsCountEl = document.getElementById('optimizations-count');
const qualityScoreEl = document.getElementById('quality-score');

// Tab elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// List containers
const issuesList = document.getElementById('issues-list');
const securityList = document.getElementById('security-list');
const performanceList = document.getElementById('performance-list');
const optimizedCode = document.getElementById('optimized-code');

// ===================================
// Line Numbers Management
// ===================================
function updateLineNumbers() {
    const lines = codeInput.value.split('\n');
    const lineNumbersHTML = lines.map((_, index) => 
        `<div class="line-number">${index + 1}</div>`
    ).join('');
    lineNumbers.innerHTML = lineNumbersHTML;
    
    // Update stats
    lineCount.textContent = lines.length;
    charCount.textContent = codeInput.value.length;
}

// Sync scrolling between line numbers and code input
codeInput.addEventListener('scroll', () => {
    lineNumbers.scrollTop = codeInput.scrollTop;
});

codeInput.addEventListener('input', updateLineNumbers);

// ===================================
// Language Selection
// ===================================
languageSelect.addEventListener('change', (e) => {
    selectedLanguage.textContent = e.target.options[e.target.selectedIndex].text;
});

// ===================================
// File Upload
// ===================================
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            codeInput.value = event.target.result;
            updateLineNumbers();
            
            // Auto-detect language from file extension
            const extension = file.name.split('.').pop().toLowerCase();
            const languageMap = {
                'js': 'javascript',
                'py': 'python',
                'java': 'java',
                'cpp': 'cpp',
                'c': 'cpp',
                'cs': 'csharp',
                'go': 'go',
                'rs': 'rust',
                'ts': 'typescript',
                'php': 'php',
                'rb': 'ruby',
                'swift': 'swift',
                'kt': 'kotlin'
            };
            
            if (languageMap[extension]) {
                languageSelect.value = languageMap[extension];
                selectedLanguage.textContent = languageSelect.options[languageSelect.selectedIndex].text;
            }
        };
        reader.readAsText(file);
    }
});

// ===================================
// Clear Code
// ===================================
clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the code?')) {
        codeInput.value = '';
        updateLineNumbers();
        resultsSection.classList.remove('active');
    }
});

// ===================================
// Tab Navigation
// ===================================
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Remove active class from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        btn.classList.add('active');
        document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
});

// ===================================
// Mock Analysis Data
// ===================================
function getMockAnalysisData(code, language) {
    // This is mock data for demonstration. In production, this would call an API
    return {
        issues: [
            {
                title: 'Using var instead of const/let',
                severity: 'medium',
                description: 'The var keyword has function scope which can lead to unexpected behavior. Use const for constants and let for variables that need to be reassigned.',
                location: 'Line 2',
                code: 'var total = 0;',
                suggestion: 'Replace var with let or const based on whether the variable is reassigned.'
            },
            {
                title: 'Inefficient loop iteration',
                severity: 'low',
                description: 'Accessing array.length in every loop iteration is inefficient. Cache the length before the loop.',
                location: 'Line 3',
                code: 'for (var i = 0; i < items.length; i++)',
                suggestion: 'Cache the array length: const len = items.length; for (let i = 0; i < len; i++)'
            }
        ],
        security: [
            {
                title: 'Potential type coercion issue',
                severity: 'medium',
                description: 'Using loose equality (==) can lead to unexpected type coercion. Always use strict equality (===) to avoid security vulnerabilities.',
                location: 'Line 3',
                code: 'if (value == null)',
                suggestion: 'Use strict equality: if (value === null)'
            }
        ],
        performance: [
            {
                title: 'Array concatenation in loop',
                severity: 'medium',
                description: 'Concatenating values in a loop creates a new array on each iteration, which is inefficient for large datasets.',
                location: 'Line 3-5',
                code: 'total = total + items[i].price;',
                suggestion: 'Use array methods like reduce() for better performance: items.reduce((sum, item) => sum + item.price, 0)'
            },
            {
                title: 'Consider using modern array methods',
                severity: 'low',
                description: 'Modern array methods like reduce(), map(), and filter() are more declarative and often more performant.',
                location: 'Line 3-5',
                code: 'for loop',
                suggestion: 'Use functional programming approach with reduce() method'
            }
        ],
        optimized: `// Optimized version using modern JavaScript best practices

function calculateTotal(items) {
    // Validate input
    if (!Array.isArray(items)) {
        throw new TypeError('Expected items to be an array');
    }
    
    // Use reduce for efficient summation
    // This is more declarative and typically better optimized by JS engines
    return items.reduce((total, item) => {
        // Validate each item has a price property
        if (typeof item?.price !== 'number') {
            console.warn('Item missing valid price:', item);
            return total;
        }
        return total + item.price;
    }, 0);
}

// Alternative: If you need to filter out invalid items first
function calculateTotalWithValidation(items) {
    return items
        .filter(item => typeof item?.price === 'number')
        .reduce((total, item) => total + item.price, 0);
}

// Example usage:
const items = [
    { name: 'Item 1', price: 10.99 },
    { name: 'Item 2', price: 25.50 },
    { name: 'Item 3', price: 5.00 }
];

console.log(calculateTotal(items)); // 41.49`,
        stats: {
            issuesCount: 2,
            securityCount: 1,
            optimizationsCount: 2,
            qualityScore: 'B+'
        }
    };
}

// ===================================
// Render Analysis Results
// ===================================
function renderIssue(issue, container) {
    const issueCard = document.createElement('div');
    issueCard.className = `issue-card severity-${issue.severity}`;
    issueCard.innerHTML = `
        <div class="issue-header">
            <h4 class="issue-title">${issue.title}</h4>
            <span class="severity-badge ${issue.severity}">${issue.severity}</span>
        </div>
        <p class="issue-description">${issue.description}</p>
        <div class="issue-location">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
            ${issue.location}
        </div>
        <pre class="issue-code"><code>${escapeHtml(issue.code)}</code></pre>
        <div class="issue-suggestion">
            <div class="suggestion-label">
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                </svg>
                Suggestion
            </div>
            ${issue.suggestion}
        </div>
    `;
    container.appendChild(issueCard);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// Analyze Code
// ===================================
analyzeBtn.addEventListener('click', async () => {
    const code = codeInput.value.trim();
    
    if (!code) {
        alert('Please enter some code to analyze');
        return;
    }
    
    // Show loading state
    loadingState.classList.add('active');
    resultsSection.classList.remove('active');
    progressBar.style.width = '0%';
    
    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 90) progress = 90;
        progressBar.style.width = progress + '%';
    }, 200);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearInterval(progressInterval);
    progressBar.style.width = '100%';
    
    // Get analysis data
    const language = languageSelect.value;
    const analysis = getMockAnalysisData(code, language);
    
    // Update summary cards
    issuesCountEl.textContent = analysis.stats.issuesCount;
    securityCountEl.textContent = analysis.stats.securityCount;
    optimizationsCountEl.textContent = analysis.stats.optimizationsCount;
    qualityScoreEl.textContent = analysis.stats.qualityScore;
    
    // Clear previous results
    issuesList.innerHTML = '';
    securityList.innerHTML = '';
    performanceList.innerHTML = '';
    
    // Render issues
    if (analysis.issues.length > 0) {
        analysis.issues.forEach(issue => renderIssue(issue, issuesList));
    } else {
        issuesList.innerHTML = '<div class="empty-state"><p>No issues found! Your code looks great.</p></div>';
    }
    
    // Render security alerts
    if (analysis.security.length > 0) {
        analysis.security.forEach(issue => renderIssue(issue, securityList));
    } else {
        securityList.innerHTML = '<div class="empty-state"><p>No security vulnerabilities detected.</p></div>';
    }
    
    // Render performance suggestions
    if (analysis.performance.length > 0) {
        analysis.performance.forEach(issue => renderIssue(issue, performanceList));
    } else {
        performanceList.innerHTML = '<div class="empty-state"><p>Your code is well-optimized!</p></div>';
    }
    
    // Render optimized code
    optimizedCode.textContent = analysis.optimized;
    
    // Hide loading, show results
    setTimeout(() => {
        loadingState.classList.remove('active');
        resultsSection.classList.add('active');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
});

// ===================================
// Copy Optimized Code
// ===================================
copyOptimizedBtn.addEventListener('click', async () => {
    const code = optimizedCode.textContent;
    
    try {
        await navigator.clipboard.writeText(code);
        
        // Visual feedback
        const originalText = copyOptimizedBtn.innerHTML;
        copyOptimizedBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Copied!
        `;
        
        setTimeout(() => {
            copyOptimizedBtn.innerHTML = originalText;
        }, 2000);
    } catch (err) {
        alert('Failed to copy code. Please copy manually.');
    }
});

// ===================================
// Export Report
// ===================================
exportBtn.addEventListener('click', () => {
    const reportData = {
        timestamp: new Date().toISOString(),
        language: languageSelect.value,
        summary: {
            issues: issuesCountEl.textContent,
            security: securityCountEl.textContent,
            optimizations: optimizationsCountEl.textContent,
            qualityScore: qualityScoreEl.textContent
        },
        originalCode: codeInput.value,
        optimizedCode: optimizedCode.textContent
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coderefine-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// ===================================
// Keyboard Shortcuts
// ===================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to analyze
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        analyzeBtn.click();
    }
    
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearBtn.click();
    }
});

// ===================================
// Handle Tab Key in Textarea
// ===================================
codeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = codeInput.selectionStart;
        const end = codeInput.selectionEnd;
        const value = codeInput.value;
        
        // Insert 4 spaces
        codeInput.value = value.substring(0, start) + '    ' + value.substring(end);
        codeInput.selectionStart = codeInput.selectionEnd = start + 4;
        
        updateLineNumbers();
    }
});

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    updateLineNumbers();
    
    // Add entrance animations
    setTimeout(() => {
        document.querySelector('.header').style.opacity = '1';
    }, 100);
});

// ===================================
// Smooth Scroll Enhancement
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
