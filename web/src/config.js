// Configuration for the OdoWatch website
// Update these values based on your Firebase project

export const config = {
  // Firebase Functions URL for creating GitHub issues
  // Replace 'your-project-id' with your actual Firebase project ID
  // Format: https://us-central1-PROJECT_ID.cloudfunctions.net/createIssue
  functionsUrl: import.meta.env.VITE_FUNCTIONS_URL || 
    'https://us-central1-your-project-id.cloudfunctions.net/createIssue'
}

