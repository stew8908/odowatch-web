import React from 'react'
import './Privacy.css'

function Privacy() {
  return (
    <div className="privacy">
      <div className="container">
        <div className="privacy-content">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2>Introduction</h2>
            <p>
              OdoWatch ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our mobile application.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <h3>Bluetooth Information</h3>
            <p>
              OdoWatch uses your device's Bluetooth connection to identify which vehicle 
              you are driving. We collect Bluetooth device identifiers (such as MAC addresses 
              or device names) to associate trips with specific vehicles. This information 
              is stored locally on your device.
            </p>

            <h3>Location Data</h3>
            <p>
              OdoWatch may access location data to calculate trip distances and update 
              your estimated odometer reading. Location data is processed locally on your 
              device and is not transmitted to our servers.
            </p>

            <h3>Mileage and Service Information</h3>
            <p>
              You may voluntarily provide information about your vehicle's mileage and 
              upcoming service appointments. This information is stored locally on your 
              device and is used solely to provide service reminders.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Identify which vehicle you are driving based on Bluetooth connections</li>
              <li>Calculate and track estimated odometer readings</li>
              <li>Provide service reminders based on your specified service mileage</li>
              <li>Improve the functionality and user experience of the app</li>
            </ul>
          </section>

          <section>
            <h2>Data Storage</h2>
            <p>
              All data collected by OdoWatch is stored locally on your device. We do not 
              transmit, store, or access your data on external servers. Your vehicle information, 
              mileage data, and service reminders remain private and under your control.
            </p>
          </section>

          <section>
            <h2>Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to 
              third parties. Since all data is stored locally on your device, we do not 
              have access to your information and therefore cannot share it.
            </p>
          </section>

          <section>
            <h2>Permissions</h2>
            <p>OdoWatch requires the following permissions:</p>
            <ul>
              <li><strong>Bluetooth:</strong> To identify and connect to your vehicle's Bluetooth system</li>
              <li><strong>Location (when in use):</strong> To calculate trip distances for odometer tracking</li>
            </ul>
            <p>
              These permissions are essential for the app's core functionality. You can 
              revoke these permissions at any time through your device settings, though 
              this may limit the app's ability to function properly.
            </p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical measures to protect your data stored on 
              your device. However, please be aware that no method of electronic storage 
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>Children's Privacy</h2>
            <p>
              OdoWatch is not intended for children under the age of 13. We do not 
              knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of 
              any changes by posting the new Privacy Policy on this page and updating the 
              "Last updated" date.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us 
              through our <a href="/contact">contact form</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Privacy

