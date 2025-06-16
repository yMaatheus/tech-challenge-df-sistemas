ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="NestJS"

WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Set port
ENV PORT=3333

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp openssl pkg-config python-is-python3

# Install node modules
COPY --link package.json ./
RUN npm install --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app

EXPOSE 3333
CMD [ "npm", "run", "start:prod" ]