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
              you are driving. We collect Bluetooth device identifiers, including MAC addresses, 
              to associate trips with specific vehicles. MAC addresses are stored securely in 
              Firebase Firestore to maintain your vehicle profiles across devices and app sessions.
            </p>

            <h3>Location Data</h3>
            <p>
              OdoWatch may access location data to calculate trip distances and update 
              your estimated odometer reading. Location data is processed on your device 
              to calculate distances, and the resulting mileage information is stored in 
              Firebase Firestore. Raw location coordinates are not stored in the cloud.
            </p>

            <h3>Mileage and Service Information</h3>
            <p>
              OdoWatch collects and stores your vehicle's mileage data, including estimated 
              odometer readings and trip distances. You may also provide information about 
              upcoming service appointments and service mileage thresholds. This mileage data 
              is stored securely in Firebase Firestore to sync across your devices and provide 
              accurate service reminders.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Identify which vehicle you are driving based on Bluetooth MAC addresses</li>
              <li>Calculate and track estimated odometer readings across trips</li>
              <li>Store and sync your mileage data across your devices</li>
              <li>Provide service reminders based on your specified service mileage</li>
              <li>Maintain your vehicle profiles and trip history</li>
              <li>Improve the functionality and user experience of the app</li>
            </ul>
          </section>

          <section>
            <h2>Data Storage</h2>
            <p>
              OdoWatch stores your data securely in Firebase Firestore, a cloud database 
              service provided by Google. The following information is stored in the cloud:
            </p>
            <ul>
              <li><strong>MAC Addresses:</strong> Bluetooth device identifiers used to identify your vehicles</li>
              <li><strong>Mileage Data:</strong> Estimated odometer readings, trip distances, and mileage history</li>
              <li><strong>Service Information:</strong> Service mileage thresholds and reminders you configure</li>
            </ul>
            <p>
              This cloud storage allows your data to sync across multiple devices and ensures 
              your information is preserved if you reinstall the app or switch devices. All 
              data is stored securely using Firebase's security rules and encryption.
            </p>
          </section>

          <section>
            <h2>Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to 
              third parties. Your data stored in Firebase Firestore is accessible only to 
              you through your authenticated account. We do not share your MAC addresses, 
              mileage data, or vehicle information with advertisers, analytics companies, 
              or any other third parties.
            </p>
            <p>
              Your data is stored using Firebase's secure infrastructure, which complies 
              with industry-standard security practices. Firebase acts as a data processor 
              and does not use your data for its own purposes beyond providing the storage 
              service.
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
              We implement appropriate technical measures to protect your data. Your information 
              stored in Firebase Firestore is protected by:
            </p>
            <ul>
              <li>Firebase Authentication to ensure only you can access your data</li>
              <li>Firebase Security Rules that restrict access to your data</li>
              <li>Encryption in transit (HTTPS) and at rest</li>
              <li>Google's secure infrastructure and compliance with industry standards</li>
            </ul>
            <p>
              However, please be aware that no method of electronic storage or transmission 
              is 100% secure, and we cannot guarantee absolute security. We recommend using 
              a strong password and keeping your account credentials secure.
            </p>
          </section>

          <section>
            <h2>Your Rights and Data Control</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your data stored in Firebase Firestore through the app</li>
              <li>Delete your account and all associated data at any time</li>
              <li>Request a copy of your stored data</li>
              <li>Stop using the app, which will prevent further data collection</li>
            </ul>
            <p>
              To delete your data, you can delete your account through the app settings 
              or contact us through our <a href="/contact">contact form</a>.
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

