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
    server_tokens off;\
    client_max_body_size 50M;\
    client_body_buffer_size 16k;\
    client_header_buffer_size 1k;\
    large_client_header_buffers 2 1k;\
    proxy_connect_timeout 600;\
    proxy_send_timeout 600;\
    proxy_read_timeout 600;\
    fastcgi_send_timeout 600;\
    fastcgi_read_timeout 600;\
    location / {\
        root /usr/share/nginx/html;\
        index index.html;\
        try_files $uri $uri/ /index.html;\
        proxy_buffering on;\
        proxy_buffer_size 16k;\
        proxy_busy_buffers_size 24k;\
        proxy_buffers 64 4k;\
        add_header X-Frame-Options "SAMEORIGIN" always;\
        add_header X-XSS-Protection "1; mode=block" always;\
        add_header X-Content-Type-Options "nosniff" always;\
    }\
    error_page 502 /502.html;\
    location = /502.html {\
        root /usr/share/nginx/html;\
        internal;\
    }\
}' > /etc/nginx/conf.d/default.conf

# Set environment variables for Coolify
ENV PORT=80

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]