FROM node:12 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --prod

COPY . .

ARG YARN_BUILD_ENV
RUN yarn run build:$YARN_BUILD_ENV

FROM nginx:alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
