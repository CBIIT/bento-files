FROM node:22.22-alpine AS fnl_base_image
ENV PORT 8081
ENV NODE_ENV production
RUN apk upgrade --no-cache zlib
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY  --chown=node:node . .
EXPOSE 8081
CMD [ "node", "./bin/www" ]
