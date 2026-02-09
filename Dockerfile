FROM node:16-bullseye AS build

WORKDIR /app

COPY package.json package-lock.json yarn.lock ./
RUN npm ci --ignore-scripts

COPY . .
ARG REACT_APP_API_ENDPOINT
ENV REACT_APP_API_ENDPOINT=$REACT_APP_API_ENDPOINT
RUN npm run build

FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
