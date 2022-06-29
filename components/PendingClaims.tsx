import { Provider, Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { metaMaskNetworks, pendingClaims, PHO_TOKEN_ADDRESS } from "../constants";
import usePhoboCoinContract from "../hooks/usePhoboCoinContract";
import usePontisContract from "../hooks/usePontisContract"; 

type PontisContractType = {
  contractAddress: string;
  phoboCoinAddress: string;
};

const PendingClaims = ({ contractAddress, phoboCoinAddress }: PontisContractType) => {
  const { chainId, account, library } = useWeb3React<Web3Provider>();
  // const PontisContract = usePontisContract(contractAddress);
  // const PhoboCoinContract = usePhoboCoinContract(phoboCoinAddress);

  // useEffect(() => {
  //   todo();
  // },[])

  let currentClaims = pendingClaims.get(account); 
  if (currentClaims != null && currentClaims.length > 0) {
    return (
      <div>
      <form>
        <div>
          <table>
            <caption>Pending Claims</caption>
            <thead>
              <tr>
                <th>Native Token</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              currentClaims
                .filter(c => c.targetChainId == chainId)
                .map((c,i) =>
                {
                  return (
                    <tr key={i}>
                      <td>{c.nativeToken}</td>
                      <td>{c.amount}</td>
                      <td><button type="button">Claim</button></td>
                    </tr>
                  );
                })
            }
            </tbody>
          </table>
        </div>
      </form>
      <style jsx>{`
          
      `}</style>
      </div>
    );
  };
  
  return (
    <p>No Pending Claims</p>
  );  
}

export default PendingClaims;
