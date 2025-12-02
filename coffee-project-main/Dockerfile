# Use a lightweight, specific Node.js version
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if you have it) first
# This leverages Docker's build cache
COPY package*.json ./

# Install *only* production dependencies
# We don't need mocha, chai, etc. in the final image
RUN npm ci --only=production

# Copy the rest of your application code
# (app.js, server.js, data.js, public folder, etc.)
COPY . .

# Expose the port your server listens on
EXPOSE 3000

# The command to run your application (using our new server.js)
CMD [ "node", "server.js" ]
