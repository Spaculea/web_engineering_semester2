FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# Copy package.json and package-lock.json first for better caching
COPY package*.json ./
RUN npm install

# Bundle app source
COPY src/ ./src/

# Make sure the assets directory exists
RUN mkdir -p ./src/assets/Altklausuren

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "src/server.js"]