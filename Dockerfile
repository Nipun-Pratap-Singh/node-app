# Stage 1: Build the frontend
FROM node:18 as frontend-builder
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ ./
RUN npm run build

# Stage 2: Setup the server
FROM node:18
WORKDIR /app/server
COPY Server/package*.json ./
RUN npm install

# Copy the built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./public

# Copy the server files
COPY Server/ ./

EXPOSE 3000

# Command to start the server
CMD ["node", "server.js"]
