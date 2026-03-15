# QS Flow | MEP Quantity Surveying Workflow

Precision workflow management for MEP Quantity Surveyors. This application is built with Next.js, React, Tailwind CSS, and ShadCN UI.

## Features
- **Automated Workflow Pipeline**: Manage MEP projects through Inquiry, Take-off, Estimation, Review, Tender Submission, and Post-Tender.
- **Terminal States**: Dedicated WON and LOST status tracking.
- **Technical Parameter Management**: Track project area (sq.ft.), levels, design reviewers, and owners.
- **Automated Audit Trail**: Every change is automatically logged in the project history.
- **Dashboard Analytics**: Visualize pipeline distribution and success rates.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Publishing to GitHub

To publish this project to your GitHub account, follow these steps in your terminal:

1. **Initialize Git**:
   ```bash
   git init
   ```

2. **Add all files**:
   ```bash
   git add .
   ```

3. **Commit your changes**:
   ```bash
   git commit -m "Initial commit of MEP QS Workflow"
   ```

4. **Create a new repository on GitHub**:
   Go to [github.com/new](https://github.com/new) and follow the steps to create a new repository. Do not initialize it with a README or License.

5. **Connect and push**:
   Replace `yourusername` and `your-repo-name` with your actual GitHub details:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

## Deployment

This app is ready for deployment on **Firebase App Hosting**. Check `apphosting.yaml` for configuration details.
