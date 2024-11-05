import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const main = async (
  email: string,
  password: string,
  phone_notification: string,
  phone_number: string
) => {
  const user = await prisma.lol.create({
    data: {
      email,
      password,
      phone_notification,
      phone_number,
    },
  });
  return user;
};
