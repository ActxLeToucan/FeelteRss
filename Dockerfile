ARG NODE_VERSION

FROM node:$NODE_VERSION-alpine

ENV WAIT_VERSION="2.7.2"

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

RUN mkdir -p /usr/app
COPY . /usr/app/
WORKDIR /usr/app
RUN npm ci
RUN npm run build

ENV NODE_ENV="production"

RUN npm ci --omit=dev
RUN chown -R node:node /usr/app
USER node

CMD /wait && npm start
