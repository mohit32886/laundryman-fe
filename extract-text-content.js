const fs = require('fs');
const path = require('path');

// Function to extract text from JSX content
function extractTextFromJSX(content) {
  const texts = [];
  
  // Extract text from JSX tags: <h1>text</h1>, <p>text</p>, etc.
  const tagTextRegex = />([^<{]+)</g;
  let match;
  while ((match = tagTextRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text && text.length > 0 && !text.startsWith('{') && !text.includes('className')) {
      texts.push(text);
    }
  }
  
  // Extract string literals in arrays/objects
  // Use backreference to ensure opening and closing quotes match
  const stringLiteralRegex = /(['"`])([^\1]+)\1/g;
  while ((match = stringLiteralRegex.exec(content)) !== null) {
    const text = match[2]; // match[1] is the quote, match[2] is the content
    // Filter out URLs, class names, and code
    if (text && 
        !text.startsWith('http') && 
        !text.startsWith('/') && 
        !text.includes('className') &&
        !text.includes('import') &&
        !text.includes('export') &&
        text.length > 2 &&
        !text.match(/^[a-z]+-[a-z]+$/)) { // Filter out CSS classes
      texts.push(text);
    }
  }
  
  return texts;
}

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return extractTextFromJSX(content);
  } catch (error) {
    return [];
  }
}

// Main extraction
const output = [];
output.push('================================================================================');
output.push('                    LAUNDRYMAN WEBSITE - TEXT CONTENT ONLY');
output.push('================================================================================');
output.push('Extracted Date: February 8, 2026');
output.push('This file contains ONLY the visible text content from the website');
output.push('================================================================================');
output.push('');

// Process all JSX files
const jsxFiles = [
  'src/pages/Home.jsx',
  'src/pages/Services.jsx',
  'src/pages/B2BServices.jsx',
  'src/pages/Pricing.jsx',
  'src/pages/AboutUs.jsx',
  'src/pages/ContactUs.jsx',
  'src/pages/GetFranchise.jsx',
  'src/pages/Blogs.jsx',
  'src/pages/PrivacyPolicy.jsx',
  'src/pages/TermsAndConditions.jsx',
  'src/pages/StoreLocator.jsx',
  'src/components/Navbar.jsx',
  'src/components/Footer.jsx',
  'src/components/B2BQuoteModal.jsx',
  'src/components/CallbackModal.jsx',
  'src/components/PickupModal.jsx',
  'src/components/TermsModal.jsx',
  'src/components/TestimonialCarousel.jsx',
  'src/components/BlogModal.jsx',
];

jsxFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    output.push('');
    output.push(`================================================================================`);
    output.push(`PAGE/COMPONENT: ${file}`);
    output.push(`================================================================================`);
    const texts = processFile(filePath);
    texts.forEach(text => {
      if (text.trim().length > 0) {
        output.push(text.trim());
      }
    });
  }
});

fs.writeFileSync('laundryman-website-text-content.txt', output.join('\n'));
console.log('Text content extracted to: laundryman-website-text-content.txt');

