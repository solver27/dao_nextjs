import prisma from "../../src/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const proposals = await prisma.proposal.findMany()
    res.status(200).json(proposals);
  } 
  else if (req.method === 'POST') {
    const { title, desc, date, min } = req.body;
    const result = await prisma.proposal.create({
        data: {
            id: 1,
            title: title,
            description: desc,
            minVote: min,
            endTime: date,
        },
    });
    res.json(result);
  }
}
