import prisma from "../../src/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET' && req.query.id) {
    const proposal = await prisma.proposal.findUnique({
      where: {
        id: parseInt(req.query.id),
      },
      include: {
        voters: {
          select: { address: true, amount: true, support: true },
        },
      },
    });
    res.status(200).json(proposal);
  } 
  else if (req.method === 'POST') {
    const { id, title, desc, endTime, min } = req.body;
    const result = await prisma.proposal.create({
        data: {
            id: id,
            title: title,
            description: desc,
            minVote: min,
            endTime: endTime,
        },
    });
    res.json(result);
  }
}
