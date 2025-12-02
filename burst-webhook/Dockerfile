FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY server.js ./

# Expose application port
EXPOSE 3000

# Run the server
CMD ["npm", "start"]
