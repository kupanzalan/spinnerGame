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

  const savedUser = await prisma.user.create({
    data: {
      name: name, 
      money: 1000,
    },
  });
  console.log(savedUser);
  return NextResponse.json(savedUser);
}

export const PUT = async (req, res) => {
  console.log('PUT');
  const { name, money } = await req.json();

  const userToUpdate = await prisma.user.findMany({
    where: { name: name },
  });

  console.log(userToUpdate);
  if (!userToUpdate) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userToUpdate[0].id,
    }, 
    data: {
      money: money,
    }
  });
  console.log(updatedUser);

  return new Response("User updated");
}
