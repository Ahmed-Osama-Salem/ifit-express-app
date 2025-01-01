    # Use an official Node.js runtime as the base image
    FROM node:18

    # Set the working directory in the container
    WORKDIR /app

    # Copy package.json and package-lock.json to the container
    COPY package*.json ./

    # COPY .env.example .env
    # Install the application dependencies
    RUN npm install

    # Copy the application code to the container
    COPY . .

    # Expose the desired port
    EXPOSE 8000

    # Set the command to run your application
    CMD ["npm", "run", "dev"]