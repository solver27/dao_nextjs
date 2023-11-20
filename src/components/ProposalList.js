import { useState, useEffect } from "react";

const ProposalList = () => {
  useEffect(() => {
    const request = async () => {
      const response = await fetch('/api/proposals', {
        method: 'GET'
      });
      const data = await response.json();
      console.log(data);
    }
    request();
  }, []);

  return (
    <div>

    </div>
  )
}

export default ProposalList;