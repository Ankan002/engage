import { PrismaClient } from "@prisma/client";

const Client = {
	client: new PrismaClient(),
};

Object.freeze(Client);

export const getPrismaClient = () => Client.client;
