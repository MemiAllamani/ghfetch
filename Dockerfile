FROM node:alpine

# Install bash
RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN apk add --update git

# Install knex cli
RUN npm install knex -g

# Install angular cli
RUN npm install -g @angular/cli

# Copy files
RUN mkdir -p /usr/ghfetch
COPY . /usr/ghfetch

# Setup backend
WORKDIR /usr/ghfetch
RUN npm install
RUN knex migrate:latest --cwd resources/

# Setup frontend
WORKDIR ./src/public
RUN npm install
RUN ng build

# Go to roor dir
WORKDIR /usr/ghfetch

# Expose port 3000
EXPOSE 3000

# Run
CMD ["npm", "start"]
