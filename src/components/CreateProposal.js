import { useState, useCallback } from "react";
import { useContractEvent, useContractWrite } from "wagmi";
import DAO from "../lib/DAO.json";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export default function CreateProposal() {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState();
  const [min, setMin] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();


  const { write: createProposal, isLoading } = useContractWrite({
    address: DAO.address,
    abi: DAO.abi,
    functionName: 'createProposal',
    args: [
      title,
      desc,
      ethers.parseEther(min.toString()),
      new Date(date).getTime()
    ]
  });

  useContractEvent({
    address: DAO.address,
    abi: DAO.abi,
    eventName: 'NewProposal',
    listener: async (log) => {
      const data = log[0].args;
      setIsPending(true);
      try {
        const endTime = new Date(ethers.toNumber(data.endTime));
        const body = { 
          id: ethers.toNumber(data.proposalId), 
          title: data.title, 
          desc: data.description, 
          endTime: endTime, 
          min: parseFloat(ethers.formatEther(data.minVote))
        };
        await fetch('/api/proposal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        router.push("/");
      } catch (error) {
        console.error(error);
      }
      setIsPending(false);  
    },
  });

  return (
    <div className="flex">
      <div className="flex flex-col mx-auto space-y-4">
        <h1 className="text-xl font-bold">New Proposal</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
          className="border border-black p-2 rounded"
        />
        <textarea
          cols={50}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          rows={8}
          value={desc}
          className="border border-black p-2 rounded"
        />
        <div className="flex items-center justify-between space-x-6">
          <label className="flex-1">
            Min Vote Amount :
          </label>
          <input
            type="number"
            onChange={(e) => setMin(parseFloat(e.target.value))}
            value={min}
            className="flex-1 border border-black p-1 rounded"
          />
        </div>
        <div className="flex items-center justify-between space-x-6">
          <label className="flex-1">End Date:</label>
          <input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 border border-black rounded p-1"
          />
        </div>
        <button 
          disabled={!desc || !title || !date || isLoading || isPending} 
          onClick={createProposal}
          className="rounded bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white text-lg p-2 cursor-pointer" 
        >
          Create
        </button>
      </div>
    </div>
  )
}