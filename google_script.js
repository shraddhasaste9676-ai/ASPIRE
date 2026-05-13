/**
 * Aaditya COEP's Counselling 4.0 - Form to Google Sheets Integration
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1gBZkVMH7F0TG8chgoNFp3Ef5G6yeNdc26hKWJzFwVlg/edit
 * 2. Go to Extensions -> Apps Script.
 * 3. Delete any code in the editor and paste THIS code.
 * 4. Click 'Save' (floppy disk icon).
 * 5. Click 'Deploy' -> 'New Deployment'.
 * 6. Select 'Web App'.
 * 7. Set 'Execute as' to 'Me'.
 * 8. Set 'Who has access' to 'Anyone'.
 * 9. Click 'Deploy' and copy the 'Web App URL'.
 * 10. Paste that URL into index.html where it says 'YOUR_WEB_APP_URL'.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if sheet is empty, add headers if so
    if (sheet.getLastRow() == 0) {
      sheet.appendRow([
        "Timestamp", 
        "Full Name", 
        "Mobile", 
        "City", 
        "Exam", 
        "Budget", 
        "Interested College", 
        "Interested Branch"
      ]);
    }
    
    // Append the form data
    sheet.appendRow([
      data.submitted_at || new Date().toISOString(),
      data.full_name,
      data.mobile,
      data.city,
      data.exam,
      data.budget,
      data.college,
      data.branch
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
