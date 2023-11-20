import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const Proposal = ({ id }) => {
  const [proposal, setProposal] = useState();
  const { address } = useAccount()

  useEffect(() => {
    if (id) {
      const request = async () => {
        const response = await fetch(`/api/proposal?id=${id}`, {
          method: 'GET'
        });
        const data = await response.json();
        setProposal(data);
        console.log(data);
      }
      request();
    }
  }, [id]);

  const getDate = (endTime) => {
    const date = new Date(endTime);
    return date.toLocaleDateString();
  }

  const vote = async (support) => {
    if (proposal) {
      try {
        const body = { 
          proposalId: proposal.id, 
          address, 
          amount: 50, 
          support: support 
        };
        await fetch('/api/vote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      {proposal &&
        <div className="flex flex-col space-y-4">
          <span className="text-2xl font-bold">{proposal.title}</span>
          <span>{proposal.description}</span>
          <div className="grid grid-cols-2 gap-8">
            <span><strong>Min Vote Amount : </strong>{proposal.minVote}</span>
            <span><strong>End Date : </strong>{getDate(proposal.endTime)}</span>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span><strong>YES : </strong>{proposal.yesVotes}</span>
                <button
                  onClick={() => vote(true)}
                  className="rounded bg-blue-500 hover:bg-blue-600 text-white text-md px-2 py-1 cursor-pointer"
                >
                  Vote to YES
                </button>
              </div>
              {proposal && proposal.voters.filter((voter) => voter.support).map((voter) => 
                <div className="flex justify-between">
                  <span>{voter.address}</span>
                  <span>{voter.amount}</span>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span><strong>NO : </strong>{proposal.noVotes}</span>
                <button
                  onClick={() => vote(false)}
                  className="rounded bg-red-500 hover:bg-red-600 text-white text-md px-2 py-1 cursor-pointer"
                >
                  Vote to NO
                </button>
              </div>
              {proposal && proposal.voters.filter((voter) => !voter.support).map((voter) => 
                <div className="flex justify-between">
                  <span>{voter.address}</span>
                  <span>{voter.amount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Proposal;