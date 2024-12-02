FROM node:18


# Set the working directory in the container
WORKDIR /client

# Copy package.json and package-lock.json
COPY ./client/package*.json ./

# Copy the rest of the application code
COPY client/ .

# Install app dependencies
RUN npm install


# Expose the port on which the app will run
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
