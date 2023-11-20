import { useState } from "react";

export default function Create() {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState();
  const [min, setMin] = useState(0);

  const submitData = async (e) => {
    e.preventDefault();
    const endTime = new Date(date);
    try {
      const body = { id: 2, title, desc, endTime, min };
      await fetch('/api/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <form onSubmit={submitData} className="flex flex-col mx-auto space-y-4">
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
        <input 
          type="submit"
          disabled={!desc || !title || !date} 
          value="Create"
          className="rounded bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white text-lg p-2 cursor-pointer" 
        />
      </form>
    </div>
  )
}