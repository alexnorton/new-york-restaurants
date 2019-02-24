FROM node:8-alpine as client-build

WORKDIR /app

ADD client/package.json client/yarn.lock /app/
RUN yarn
ADD client /app/
RUN yarn build

FROM nginx:1-alpine

COPY --from=client-build /app/build /usr/share/nginx/html
ADD docker/nginx/nginx.conf /etc/nginx/
