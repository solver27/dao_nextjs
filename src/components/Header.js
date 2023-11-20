import Link from "next/link";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const Header = () => {
  const { open } = useWeb3Modal()
  const { address } = useAccount()

  return (
    <div className="flex justify-between my-4">
      <Link href="/" className="block text-4xl font-bold text-center">
        DAO
      </Link>
   
      {address
        ? <label>{`${address.slice(0, 6)}...${address.slice(-4)}`}</label>
        : <button className="border border-black rounded px-2" onClick={() => open()}>
            Connect Wallet
          </button>
      }
    </div>
  )
}
export default Header;