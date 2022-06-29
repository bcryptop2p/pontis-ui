import { Provider, Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { metaMaskNetworks, PHO_TOKEN_ADDRESS } from "../constants";
import usePhoboCoinContract from "../hooks/usePhoboCoinContract";
import usePontisContract from "../hooks/usePontisContract"; 

type PontisContractType = {
  contractAddress: string;
  phoboCoinAddress: string;
};

const PontisLibrary = ({ contractAddress, phoboCoinAddress }: PontisContractType) => {
  const { chainId, account, library } = useWeb3React<Web3Provider>();
  const PontisContract = usePontisContract(contractAddress);
  const PhoboCoinContract = usePhoboCoinContract(phoboCoinAddress);
  const [amountToBridge, setAmountToBridge] = useState<number | undefined>();
  const [targetChainId, setTargetChainId] = useState<number>();

  useEffect(() => {
    getCurrentBalance();
  },[])

  const getCurrentBalance = async () => {
    const currentBalance = 333;
  }

  const amountToBridgeInput = (input) => {
    setAmountToBridge(input.target.value)
  }

  const targetChainIdInput = (input) => {
    setTargetChainId(input.target.value)
  }

  const submitTransaction = async () => {
    await PhoboCoinContract.approve(PontisContract.address, amountToBridge); 

    const tx = await PontisContract.lock(targetChainId, PHO_TOKEN_ADDRESS, amountToBridge, {
      value:    ethers.utils.parseEther('0.0000000000000001'),
      gasLimit: 85000,
      //gasPrice: 1000000000 
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
      <div>
        Native Chain: <span>{metaMaskNetworks.get(chainId)}</span> 
      </div>
      <label>
        Amount to bridge: 
        <input onChange={amountToBridgeInput} value={amountToBridge} type="number" name="amountToBridge" />
      </label>
      <div>
        <label>Target Chain:</label>
        {/* TODO - drop-down component */}
        <select onChange={targetChainIdInput} value={targetChainId} name="targetChainId">
          {
            Array
              .from(metaMaskNetworks.keys())
              .filter(key => key != chainId)
              .map(key => <option key={key} value={key}>{metaMaskNetworks.get(key)}</option>)
          }
        </select>
      </div>
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
