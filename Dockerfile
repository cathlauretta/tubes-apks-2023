FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Apply new port
ENV APP_PORT=$APP_PORT
EXPOSE $APP_PORT

# run for development
CMD npm run dev

# run for production
# CMD npm run start