FROM node:16-buster
RUN mkdir -p /home/frontend
WORKDIR /home/frontend
COPY package*.json ./
RUN npm install -g npm@8.6.0
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
