# Use the official Nginx image as a base
FROM nginx:latest

# Remove the default Nginx index.html
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom nginx.conf into the container
COPY examples/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy your static website files into the container's public directory
COPY build/ /usr/share/nginx/html/

# Expose port 80 to the host machine
EXPOSE 80