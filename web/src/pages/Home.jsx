import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>OdoWatch</h1>
          <p className="tagline">Automatically Track Your Car's Mileage</p>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>How It Works</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Bluetooth Detection</h3>
              <p>
                OdoWatch uses your car's Bluetooth connection to automatically 
                detect which vehicle you're driving. No manual input required!
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Automatic Odometer Tracking</h3>
              <p>
                The app automatically updates your estimated odometer reading 
                based on your trips, keeping track of your mileage effortlessly.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Service Reminders</h3>
              <p>
                Set your next service mileage and receive timely reminders when 
                you're approaching that milestone. Never miss a service appointment again!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="summary">
        <div className="container">
          <h2>About OdoWatch</h2>
          <p>
            OdoWatch is an iOS app designed to simplify vehicle maintenance tracking. 
            By leveraging your car's Bluetooth connection, the app automatically 
            identifies which vehicle you're driving and maintains an accurate estimate 
            of your odometer reading.
          </p>
          <p>
            Simply set your next service mileage when you get your car serviced, and 
            OdoWatch will alert you as you approach that milestone. No more guessing 
            when your next oil change or service is due—OdoWatch keeps you informed 
            and your vehicle well-maintained.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home

