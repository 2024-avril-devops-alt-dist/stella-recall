#!/bin/sh

# Génère le client Prisma
npx prisma generate

# Compile TypeScript
npx tsc

# Exécute les seeds
npm run seed

# Lance Next.js en mode développement en arrière-plan
npx next dev &

# Démarre Prisma Studio
npx prisma studio
