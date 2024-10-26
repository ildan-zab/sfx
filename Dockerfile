FROM node:22-alpine as builder

WORKDIR /client

COPY package.json /client/
RUN npm i && npm cache clean --force
ADD . /client
RUN npm run build

FROM node:22-alpine

WORKDIR /client
COPY --from=builder /client/.output  /client/.output

CMD [ "node", ".output/server/index.mjs" ]