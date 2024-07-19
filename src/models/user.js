// import { Prisma } from '@prisma/client';
const Prisma = require('@prisma/client');

const User = {
  model: {
    id: {
      type: Prisma.Int,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Prisma.String,
      unique: true,
    },
    password: {
      type: Prisma.String,
    },
    sessionToken: {
      type: Prisma.String,
      nullable: true,
    },
  },
};

module.exports =  User;
