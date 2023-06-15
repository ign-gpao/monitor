FROM node:19
LABEL maintainer="IGN"
LABEL version="1.41.0"

ENV http_proxy=$http_proxy
ENV https_proxy=$http_proxy
ENV NO_PROXY="api-gpao"

ADD ./ /var/monitor

WORKDIR /var/monitor

#RUN npm config set http-proxy $http_proxy
RUN npm config set https-proxy $http_proxy

RUN npm install supervisor -g
RUN npm install

EXPOSE 8000

ENTRYPOINT ["npm", "start"]
