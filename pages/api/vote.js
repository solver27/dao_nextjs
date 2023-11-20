import prisma from "../../src/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { proposalId, address, amount, support } = req.body;
    const voter = await prisma.voter.create({
        data: {
          proposal: { connect: { id: proposalId }}, 
          address, 
          amount, 
          support
        },
    });
    let proposal = await prisma.proposal.findUnique({
      where: {
        id: proposalId,
      },
    });
    const updatedProposal = await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        yesVotes: support ? proposal.yesVotes + amount : proposal.yesVotes,
        noVotes: support ? proposal.noVotes : amount + proposal.noVotes
      }
    })
    res.json(updatedProposal);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
