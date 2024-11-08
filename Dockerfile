# Utilisation de l'environnement de développement
FROM node:22-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Utilisation de l'environnement de production
FROM node:22-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --production

COPY . .

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]



