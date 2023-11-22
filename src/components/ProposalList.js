import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useContractRead } from "wagmi";
import DAO from "../lib/DAO.json"

const ProposalList = () => {
  const [proposals, setProposals] = useState([]);
  const { address } = useAccount();

  useEffect(() => {
    const request = async () => {
      const response = await fetch('/api/proposals', {
        method: 'GET'
      });
      const data = await response.json();
      setProposals(data);
      console.log(data);
    }
    request();
  }, []);

  const getDate = (endTime) => {
    const date = new Date(endTime);
    return date.toLocaleDateString();
  }

  const { data: daoOwner } = useContractRead({
    address: DAO.address,
    abi: DAO.abi,
    functionName: 'owner'
  });

  return (
    <div className="divide-y">
      { address && address === daoOwner &&
        <div className="flex justify-end mb-4">
          <Link href="/create"  className="rounded bg-blue-500 hover:bg-blue-600 text-white px-2 py-1">
            New Proposal
          </Link>
        </div>
      }

      {proposals.map((proposal) =>
        <Link href={`proposal/${proposal.id}`} key={proposal.id} className="grid grid-cols-6 items-center py-4">
          <span className="col-span-2 text-2xl font-bold">{proposal.title}</span>
          <span>{proposal.description.slice(0, 20)}</span>
          <span><strong>YES : </strong>{proposal.yesVotes}</span>
          <span><strong>NO : </strong>{proposal.noVotes}</span>
          <span>{getDate(proposal.endTime)}</span>
        </Link>
      )}

    </div>
  )
}

export default ProposalList;