import Link from "next/link";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import DAOToken from "../lib/DAOToken.json";
import { ethers } from "ethers";

const Header = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  const { data: daoBalance } = useContractRead({
    address: DAOToken.address,
    abi: DAOToken.abi,
    functionName: 'balanceOf',
    args: [address]
  });

  const { data, write: mintToken } = useContractWrite({
    address: DAOToken.address,
    abi: DAOToken.abi,
    functionName: 'mint',
    args: [ethers.parseEther("100")]
  });

  return (
    <div className="flex justify-between my-4">
      <Link href="/" className="block text-4xl font-bold text-center">
        DAO
      </Link>
      {address
        ? <div className="space-x-4">
            <label>
              Your DAO Balance : { daoBalance && ethers.formatEther(daoBalance) }
            </label>
            <button 
              onClick={() => mintToken()}
              className="border border-black rounded px-2"
            >
              Mint
            </button>
          </div>
        : <button className="border border-black rounded px-2" onClick={() => open()}>
            Connect Wallet
          </button>
      }
    </div>
  )
}

export default Header;