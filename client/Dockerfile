ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app
ENV NODE_ENV="production"

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build stage (builds the application files)
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY --link package.json ./
RUN npm install --include=dev

COPY --link . .
RUN npm run build

RUN npm prune --omit=dev

# Final stage: nginx to serve the build files
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy the build files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

COPY app.conf /etc/nginx/conf.d/app.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
