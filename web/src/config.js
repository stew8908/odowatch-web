// Configuration for the OdoWatch website
// The API endpoint will be automatically available at /api/createIssue when deployed to Vercel

export const config = {
  // API endpoint for creating GitHub issues
  // In development, this will use the Vercel dev server
  // In production, this will use the deployed Vercel function
  apiUrl: import.meta.env.VITE_API_URL || '/api/createIssue'
}

