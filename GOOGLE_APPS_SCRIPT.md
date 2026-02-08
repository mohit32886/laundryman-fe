# Google Sheets Integration Setup

This guide explains how to set up Google Sheets integration for form submissions.

## Step 1: Open Google Apps Script

1. Open your Google Spreadsheet: [WBL_Customer_data](https://docs.google.com/spreadsheets/d/1eu-fFaJXSQEPsnAsKCmOe9m9Eyorv4HP2T8kzno4U58/edit)
2. Go to **Extensions** → **Apps Script**

## Step 2: Add the Script

Delete any existing code and paste the following:

```javascript
/**
 * WBL Customer Data - Form Submission Handler
 * This script receives form data and writes it to the spreadsheet
 */

// Sheet names for different form types
const SHEET_NAMES = {
  callback: 'Callback Requests',
  b2b_quote: 'B2B Quotes',
  pickup: 'Pickup Requests',
  franchise: 'Franchise Inquiries',
  contact: 'Contact Messages'
};

// Column headers for each form type
const HEADERS = {
  callback: ['Timestamp', 'Name', 'Phone', 'Preferred Time', 'Message'],
  b2b_quote: ['Timestamp', 'Company Name', 'Contact Name', 'Email', 'Phone', 'Industry', 'Volume', 'Location', 'Requirements', 'Message'],
  pickup: ['Timestamp', 'Name', 'Phone', 'Address', 'Pickup Date', 'Pickup Time', 'Service Type', 'Message'],
  franchise: ['Timestamp', 'Name', 'Phone', 'Email', 'City', 'Investment Capacity', 'Message'],
  contact: ['Timestamp', 'Name', 'Phone', 'Email', 'Subject', 'Message']
};

/**
 * Handle POST requests from the website
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    
    if (!SHEET_NAMES[formType]) {
      return createResponse(false, 'Invalid form type');
    }
    
    // Get or create the sheet
    const sheet = getOrCreateSheet(formType);
    
    // Prepare row data based on form type
    const rowData = prepareRowData(formType, data);
    
    // Append the data
    sheet.appendRow(rowData);
    
    return createResponse(true, 'Data saved successfully');
  } catch (error) {
    console.error('Error processing form submission:', error);
    return createResponse(false, error.message);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'WBL Form Handler is running'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get existing sheet or create a new one with headers
 */
function getOrCreateSheet(formType) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMES[formType]);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES[formType]);
    // Add headers
    sheet.appendRow(HEADERS[formType]);
    // Format header row
    sheet.getRange(1, 1, 1, HEADERS[formType].length)
      .setFontWeight('bold')
      .setBackground('#1879a2')
      .setFontColor('white');
    // Freeze header row
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * Prepare row data based on form type
 */
function prepareRowData(formType, data) {
  const timestamp = data.timestamp || new Date().toISOString();
  
  switch (formType) {
    case 'callback':
      return [
        timestamp,
        data.name || '',
        data.phone || '',
        data.preferredTime || '',
        data.message || ''
      ];
      
    case 'b2b_quote':
      return [
        timestamp,
        data.companyName || '',
        data.contactName || '',
        data.email || '',
        data.phone || '',
        data.industry || '',
        data.volume || '',
        data.location || '',
        data.requirements || '',
        data.message || ''
      ];
      
    case 'pickup':
      return [
        timestamp,
        data.name || '',
        data.phone || '',
        data.address || '',
        data.pickupDate || '',
        data.pickupTime || '',
        data.serviceType || '',
        data.message || ''
      ];
      
    case 'franchise':
      return [
        timestamp,
        data.name || '',
        data.phone || '',
        data.email || '',
        data.city || '',
        data.investmentCapacity || '',
        data.message || ''
      ];
      
    case 'contact':
      return [
        timestamp,
        data.name || '',
        data.phone || '',
        data.email || '',
        data.subject || '',
        data.message || ''
      ];
      
    default:
      return [timestamp, JSON.stringify(data)];
  }
}

/**
 * Create JSON response
 */
function createResponse(success, message) {
  return ContentService.createTextOutput(JSON.stringify({
    success: success,
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - run this to verify setup
 */
function testSetup() {
  const testData = {
    formType: 'callback',
    timestamp: new Date().toISOString(),
    name: 'Test User',
    phone: '9999999999',
    preferredTime: '9am-12pm',
    message: 'This is a test submission'
  };
  
  const sheet = getOrCreateSheet('callback');
  const rowData = prepareRowData('callback', testData);
  sheet.appendRow(rowData);
  
  console.log('Test data added successfully!');
}
```

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure:
   - **Description**: WBL Form Handler
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Click **Authorize access** and grant permissions
6. **Copy the Web app URL** (it will look like: `https://script.google.com/macros/s/AKfyc.../exec`)

## Step 4: Configure Your Website

1. Create a `.env` file in the `laundryman-fe` folder (if it doesn't exist)
2. Add your Google Apps Script URL:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Restart your development server

## Step 5: Test the Integration

1. Open your website
2. Submit any form (Callback, Contact, Pickup, etc.)
3. Check your Google Spreadsheet - you should see new sheets created with the form data

## Sheet Structure

The script automatically creates separate sheets for each form type:

| Sheet Name | Form |
|------------|------|
| Callback Requests | Request Callback modal |
| B2B Quotes | B2B Quote modal |
| Pickup Requests | Schedule Pickup modal |
| Franchise Inquiries | Get Franchise page |
| Contact Messages | Contact Us page |

## Troubleshooting

### Form not submitting?
- Check browser console for errors
- Verify the `VITE_GOOGLE_SCRIPT_URL` is set correctly
- Make sure the Apps Script is deployed as a web app

### Data not appearing in spreadsheet?
- Run the `testSetup()` function in Apps Script to verify it works
- Check the Apps Script execution logs: **View** → **Executions**

### CORS errors?
- The service uses `mode: 'no-cors'` which should work, but verify deployment settings

## Updating the Script

If you need to update the script:
1. Make changes in Apps Script
2. Click **Deploy** → **Manage deployments**
3. Click the pencil icon to edit
4. Change version to **New version**
5. Click **Deploy**

The URL stays the same, so no need to update your `.env` file.


