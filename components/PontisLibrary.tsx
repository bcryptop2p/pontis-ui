import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { PHO_TOKEN_ADDRESS } from "../constants";
import usePhoboCoinContract from "../hooks/usePhoboCoinContract";
import usePontisContract from "../hooks/usePontisContract"; 

type PontisContractType = {
  contractAddress: string;
  phoboCoinAddress: string;
};

const PontisLibrary = ({ contractAddress, phoboCoinAddress }: PontisContractType) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const PontisContract = usePontisContract(contractAddress);
  const PhoboCoinContract = usePhoboCoinContract(phoboCoinAddress);
  const [amountToBridge, setAmountToBridge] = useState<number | undefined>();

  useEffect(() => {
    getCurrentBalance();
  },[])

  const getCurrentBalance = async () => {
    const currentBalance = 333;
  }

  const amountToBridgeInput = (input) => {
    setAmountToBridge(input.target.value)
  }

  const submitTransaction = async () => {
    await PhoboCoinContract.increaseAllowance(PontisContract.address, amountToBridge);

    const tx = await PontisContract.lock(PHO_TOKEN_ADDRESS, amountToBridge, {
      value:    ethers.utils.parseEther('0.0000000000000001'),
      gasLimit: ethers.utils.parseEther('0.0000005')
    }); 

    await tx.wait();
    resetForm();
  }

  const resetForm = async () => {
    setAmountToBridge(0);
  }

  return (
    <div className="results-form">
    <form>
      <label>
        Amount to bridge: 
        <input onChange={amountToBridgeInput} value={amountToBridge} type="number" name="amountToBridge" />
      </label>
    </form>
    <div className="button-wrapper">
      <button onClick={submitTransaction}>Submit Transaction</button>
    </div>
    <style jsx>{`
        .results-form {
          display: flex;
          flex-direction: column;
        }

        .button-wrapper {
          margin: 20px;
        }
      `}</style>
    </div>
  );
};

export default PontisLibrary;
