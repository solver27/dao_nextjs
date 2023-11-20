import Proposal from "../../src/components/Proposal"
import { useRouter } from 'next/router'

export default function ProposalPage() {
  const router = useRouter()

  return (
    <div>
      <Proposal id={router.query.id} />
    </div>
  )
}

  
