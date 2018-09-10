FROM node:10-alpine
WORKDIR /app
COPY . .
RUN npm install -g http-server
RUN npm install
RUN npm run build
EXPOSE 8000
ENTRYPOINT ["npm", "run", "serve"]
