# Stage 1: Build the React application
FROM node:20-slim as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using nginx
FROM nginx:alpine

# Copy the build output from stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Create nginx configuration for SPA
RUN echo 'server {\
    listen 80;\
    location / {\
        root /usr/share/nginx/html;\
        index index.html;\
        try_files $uri $uri/ /index.html;\
    }\
}' > /etc/nginx/conf.d/default.conf

# Set environment variables for Coolify
ENV PORT=80

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]