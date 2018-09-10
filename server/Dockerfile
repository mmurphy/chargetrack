FROM node:10-alpine
WORKDIR /app
COPY . .
RUN npm install --production
ENV REDIS_CONNECTION_URL redis://redis:6379
ENV MONGO_CONNECTION_URL mongodb://mongodb:27017/sync
EXPOSE 3000
ENTRYPOINT ["npm", "start"]

