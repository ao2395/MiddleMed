# MiddleMed Diagnostic Tool

MiddleMed is an interactive diagnostic tool that leverages the Priaid Health API to provide users with potential medical diagnostics based on symptoms input. It offers an easy-to-use interface for entering symptoms and viewing diagnosis results, and it can switch between 'Live' and 'Sandbox' modes for development and production environments.

## Features

- **Interactive UI**: Users can easily input their age, gender, and symptoms to receive medical diagnostics.
- **Dual API Mode**: Toggle between Sandbox for testing and Live for production using a slider in the UI.
- **Responsive Design**: Suitable for both desktop and mobile use.
- **Real-time Search Filter**: Users can search through a list of symptoms to quickly find what they are looking for.
- **Environmental Configuration**: API keys and endpoints are managed via environment variables for security and flexibility.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 12.x or later)
- [npm](https://www.npmjs.com/) (usually included with Node.js)

## Installation

To set up MiddleMed locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/middlemed.git
   cd middlemed
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory of the project and add the following variables:
   ```plaintext
   REACT_APP_SANDBOX_TOKEN=your_sandbox_token_here
   REACT_APP_LIVE_TOKEN=your_live_token_here
   ```

4. **Start the application:**
   ```bash
   npm start
   ```
   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

After launching the app, use the UI to enter the user's age and gender, select symptoms from the provided list, and click the "Diagnose" button to retrieve the diagnostics. Use the slider at the top left to switch between the Sandbox and Live environments.
The Live version of the App has a much bigger dataset but limited calls.
## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Acknowledgments

- Thanks to Priaid Health API for providing the medical data and diagnostic capabilities.
- Thanks to all contributors who have helped to make this tool better.

---

## AI Assistance
 - AI was used for CSS Styling
 - It was also used to debug the main functionality of the program

