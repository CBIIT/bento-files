FROM node:22.22-alpine3.23 AS fnl_base_image
ENV PORT 8081
ENV NODE_ENV production
RUN apk add --no-cache "zlib=1.3.2-r0"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY  --chown=node:node . .
EXPOSE 8081
CMD [ "node", "./bin/www" ]
