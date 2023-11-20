import prisma from "../../src/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const proposals = await prisma.proposal.findMany()
    res.status(200).json(proposals);
  } else {
      res.status(405).json({ message: 'Method Not Allowed' });
  }
}
