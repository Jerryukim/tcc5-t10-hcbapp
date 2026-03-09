WEB3 HEALTHCARE BOOKING APP

OVERVIEW
This project is a decentralized healthcare booking application built for the **TECHCRUSH web3 bootcamp cohort 5 Capstone project. The goal of the system is to demonstrate how blockchain technology can be integrated with traditional web applications to improve transparency, security, and trust in healthcare systems.

The platform allows patients to book appointments with doctors, make payments using MetaMask, and securely store medical record hashes on the blockchain. Doctors can record diagnosis information and generate a record hash that is stored on-chain for verification.

This ensures that medical records cannot be tampered with while still allowing them to be managed off-chain through the backend system.

PROBLEM STATEMENT
Traditional healthcare appointment systems often lack transparency and secure record verification. Patients cannot easily verify whether their medical records have been altered or tampered with.

Additionally, payment systems are usually centralized and depend on third-party platforms.
This project explores how blockchain can help solve these issues by providing:
  *Transparent payments
  *Immutable record verification
  *Decentralized interaction between patients and doctors
  
SOLUTION
The Web3 Healthcare Booking App provides the following features:

   Patient Portal
Patients can:
View available medical specialties
See doctors under each specialty
Book appointments
Pay for appointments using MetaMask
   Doctor Portal
Doctors can:
Create medical records for patients
Add diagnosis and prescription information
Store a hash of the medical record on the blockchain
   Patient Records
Patients can:
View their diagnosis and prescription
Verify the integrity of their medical records using the blockchain hash

KEY FEATURES
Doctor appointment booking system
Web3 payments using MetaMask
Smart contract interaction on Sepolia testnet
Medical record storage with blockchain hash verification
Patient and doctor portal system
Backend API for managing records and bookings

TECH STACK
  Frontend
Next.js
React
TypeScript
TailwindCSS
    Backend
Node.js
Prisma ORM
PostgreSQL
    Blockchain
Solidity
Foundry
Ethers.js
Sepolia Testnet
   Wallet
MetaMask

SMART CONTRACT
Network: Sepolia Testnet
Contract Address:  0x67a54D7D9B17127Bc91508839915A8285245cB16
   The smart contract handles:
appointment payments
storage of medical record hashes
verification of stored hashes

APPLICATION FLOW
    Patient Flow
#1 Patient opens the application
#2 Selects a medical specialty
#3 Chooses a doctor
#4 Books an appointment
#5 Pays using MetaMask

     Doctor Flow
#1 Doctor opens the doctor portal
#2 Inputs patient diagnosis and prescription
#3 System generates a record hash
$3 Hash is stored on the blockchain

     Patient Records Flow
#1 Patient enters their ID
#2 The system fetches stored records
#3 Patient can verify the record hash stored on-chain

HOW TO RUN THE PROJECT LOCALLY
Clone the repository
git clone https://github.com/JerryUkim/tcc5-t10-hcbapp.git
Navigate to the project folder
cd tcc5-t10-hcbapp
Install dependencies
npm install
Run the development server
npm run dev
Open the application in your browser:
http://localhost:3000

FUTURE IMPROVEMENTS
Although the application demonstrates the core concept of decentralized healthcare systems, several improvements can be implemented in the future:
Authentication and role-based access control
Doctor wallet verification
IPFS storage for medical records
Appointment scheduling system
Improved UI and dashboards

PROJECT TEAM
This project was developed as part # Project Team

This project was developed as part of the **TechCrush Web3 Capstone Project (Cohort 5, Team 10)**.

Team Members:

- **Jeremiah Ukim** – Backend Development / Project Integration  
  GitHub: https://github.com/JerryUkim

- **Maxwell Tortor** – Frontend Development  
  GitHub: https://github.com/mtortor-dev

- **Faith Creflo** – Smart Contract Development  
  GitHub: https://github.com/faithfayth 


LICENSE
This project is developed for educational purposes as part of a Web3 learning program organized by TECHCRUSH.
