# Stage 1: Build the app
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . . 
RUN npx prisma generate 
RUN npm run build  
RUN ls -la /app/.next
RUN ls -la /app/node_modules/@prisma/client

# Copy environment file (adjust path if needed)
COPY .env.development .env

# Stage 2: Run the app
FROM node:20 AS runner
WORKDIR /app

COPY --from=builder /app .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV} PORT=3000

EXPOSE 3000
CMD ["npm", "start"]
