FROM node:8.9.1-alpine as build
WORKDIR /opt/app
ADD package.json yarn.lock .yarn-cache.tgz /tmp/
RUN cd /tmp && \
  tar xzf .yarn-cache.tgz && \
  rm .yarn-cache.tgz && \
  yarn && \
  tar czf - /usr/local/share/.cache/yarn/v1 > /tmp/.yarn-cache.tgz
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules
ADD . /opt/app
RUN yarn build
EXPOSE 8080

FROM nginx:1.12-alpine as staging
COPY --from=builder /tmp/.yarn-cache.tgz /tmp/.yarn-cache.tgz
COPY --from=builder /opt/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM nginx:1.12-alpine
COPY --from=staging /opt/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
