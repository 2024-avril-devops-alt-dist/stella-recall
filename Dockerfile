# Stage 1: Build the app
FROM node:20 AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json package-lock.json ./
RUN npm config set fetch-retry-maxtimeout 60000 && \
    npm install -g npm@latest && \
    npm ci

# Copy application code and generate Prisma client
COPY . . 
RUN npx prisma generate 
RUN npm run build  

# Stage 2: Run the app
FROM node:20 AS runner
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./

# Set environment variable for production
ARG APP_ENV=production
ENV APP_ENV=${APP_ENV} PORT=3000

# Expose the application port
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "start"]
