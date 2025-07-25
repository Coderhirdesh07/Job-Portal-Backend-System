# Use Node.js v18 with Alpine Linux
FROM node:18-alphine

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy app code
COPY ./src ./src
WORKDIR /app/src

# App listens on port 3000
EXPOSE 3000

# Start the app
CMD ["node",index.js];

