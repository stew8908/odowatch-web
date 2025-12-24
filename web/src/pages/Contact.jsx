import React, { useState } from 'react'
import { config } from '../config'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      // Call Vercel serverless function to create GitHub issue
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // Check if response is ok before trying to parse JSON
      let data;
      try {
        data = await response.json()
      } catch (jsonError) {
        // If response is not JSON, get text instead
        const text = await response.text()
        throw new Error(`Server error: ${response.status} ${response.statusText}. ${text}`)
      }

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been submitted and a GitHub issue has been created. We\'ll get back to you soon.'
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        // Show the actual error message from the server
        const errorMessage = data.message || data.error || `Server error: ${response.status}`
        throw new Error(errorMessage)
      }
    } catch (error) {
      // Show more detailed error message for debugging
      const errorMessage = error.message || 'Unknown error occurred'
      setStatus({
        type: 'error',
        message: `Sorry, there was an error submitting your message: ${errorMessage}. Please check the console for more details or contact us directly.`
      })
      console.error('Error submitting form:', error)
      console.error('Full error details:', {
        message: error.message,
        stack: error.stack,
        config: config.apiUrl
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h1>Contact Us</h1>
            <p>
              Have a question, found a bug, or need help with OdoWatch? 
              We'd love to hear from you! Fill out the form below and we'll 
              create a GitHub issue to track your request.
            </p>
            <p>
              Your feedback helps us improve OdoWatch and provide better 
              service to all our users.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Brief description of your issue"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Please provide details about your issue, question, or feedback..."
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact

