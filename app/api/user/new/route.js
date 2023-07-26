import { NextResponse } from "next/server";

const prisma = require('../../../../database/db.js');


export const GET = async (req, res) => {
  console.log('GET');
  const users = await prisma.user.findMany();
  console.log(users);
  return NextResponse.json(users);
}

export const POST = async (req, res) => {
  console.log('POST');
  const { name } = await req.json();
  console.log(`Name is: ${name}`);

  const savedUser = await prisma.user.create({
    data: {
      name: name, 
      money: 1000,
    },
  });
  console.log(savedUser);
  // return new Response("Everything OK");
  return NextResponse.json(savedUser);
}

export const PUT = async (req, res) => {
  console.log('PUT');
  const { name, money } = await req.json();
  console.log(`Name is: ${name}`);
  console.log(`Money is: ${money}`);

  const userToUpdate = await prisma.user.findMany({
    where: { name: name },
  });

  console.log(userToUpdate);
  if (!userToUpdate) {
    return res.status(404).json({ error: 'User not found' });
  }

  console.log(userToUpdate[0].id);
  const updatedUser = await prisma.user.update({
    where: {
      id: userToUpdate[0].id,
    }, 
    data: {
      money: money,
    }
  });
  console.log(updatedUser);

  return new Response("Everything OK");
}
