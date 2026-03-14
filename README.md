# SecureVote: End-to-End Verifiable Voting System

A prototype e2e verifiable online voting system using Paillier homomorphic encryption, designed for organizational elections (college unions, small polls).

## Features
- OTP-based voter authentication
- Client-side Paillier homomorphic encryption
- Public bulletin board for transparency
- Threshold decryption (2-of-3 trustees)
- Independent verification tool
- Ballot secrecy & one-vote-per-voter enforcement

## Tech Stack
- **Frontend**: React.js, Axios
- **Backend**: Flask, SQLite
- **Crypto**: Paillier (python-paillier), ECDSA signatures

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- pip, npm

### Backend Setup
