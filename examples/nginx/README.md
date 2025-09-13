# Nginx Docker Container Deployment

This is a guide on how to deploy the app in a Nginx Docker container. The guide assumes that you completed the installation.

Please follow theese steps:

1. Execute `npm run build` in the repository root to build to static files
2. Run `docker build -f examples/nginx/Dockerfile -t svelte_fingi:latest .` in root of the repository to build the Docker container image
3. Run the Docker container image `docker run --name svelte_fingi -p 8080:80 svelte_fingi:latest`
4. Open [http://localhost:8080](http://localhost:8080/) in your browser