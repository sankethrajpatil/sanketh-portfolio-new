# Sanketh's Portfolio

A modern, responsive portfolio website built with React and Vite.

## Technologies Used
- React
- Vite
- GSAP for animations
- CSS with modern features
- Docker for containerization
- Google Cloud Run for hosting

## Local Development
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Build
To build for production:
```bash
npm run build
```

## Preview Production Build
```bash
npm run preview
```

## Deployment to Google Cloud Run

### Prerequisites

1. Install and initialize [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
2. Enable required APIs:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   ```

### Deploy using Cloud Build

1. Ensure you're authenticated and your project is set:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. Deploy using Cloud Build:
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

The app will be deployed to Cloud Run and a URL will be provided upon successful deployment.

### Manual Deployment

Alternatively, you can build and deploy manually:

```bash
# Build the container
docker build -t gcr.io/YOUR_PROJECT_ID/sanketh-portfolio-new .

# Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/sanketh-portfolio-new

# Deploy to Cloud Run
gcloud run deploy sanketh-portfolio-new \
  --image gcr.io/YOUR_PROJECT_ID/sanketh-portfolio-new \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

## Infrastructure

- **Frontend**: React + Vite
- **Server**: Nginx (serving on port 8080)
- **Container**: Multi-stage Docker build
- **Cloud**: Google Cloud Run
- **CI/CD**: Google Cloud Build

