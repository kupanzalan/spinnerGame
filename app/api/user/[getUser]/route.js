import { NextResponse } from "next/server";

const prisma = require('../../../../database/db.js');

export const GET = async (req, res) => {
  console.log('GET user with name');

  const urlSliced = req.url.slice(req.url.lastIndexOf('/') + 1);
  const userName = urlSliced.slice(urlSliced.lastIndexOf('=') + 1);
  console.log(userName);

  const user = await prisma.user.findMany({ 
    where: { name: userName },
  });
  console.log('vljwhdv')
  console.log(`user is: ${user}`);
  console.log('lvjghwehlv');

  return NextResponse.json(user);
  // return new Response("Everything OK");
}