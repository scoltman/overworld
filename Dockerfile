FROM node:8.9.1-alpine as builder

WORKDIR /opt/app
ADD package.json yarn.lock .yarn-cache.tgz /tmp/
RUN cd /tmp && tar xzf .yarn-cache.tgz && rm .yarn-cache.tgz && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules
ADD . /opt/app
RUN yarn build
EXPOSE 8080

FROM nginx:1.12-alpine

COPY --from=builder /opt/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
