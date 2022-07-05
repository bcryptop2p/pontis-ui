import { Provider, Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { metaMaskNetworks, pendingClaims, phoTokenAddresses } from "../constants";
import usePhoboCoinContract from "../hooks/usePhoboCoinContract";
import usePontisContract from "../hooks/usePontisContract"; 
import { TokenClaim } from "../models/token-claim";

const PendingClaims = () => {
  const { chainId, account, library } = useWeb3React<Web3Provider>();
  const PontisContract = usePontisContract();
  const [claimsCount, setClaimsCount] = useState<number>(-1);

  useEffect(() => {
    PontisContract.on('Mint', onPontisMint);
    
    return () => { 
      PontisContract.off('Mint', onPontisMint);
    };
  },[chainId, account])
  
  const onPontisMint = (coinAddress, amount, receiverAddress, transactionHash, tx) => {
    let claims = pendingClaims.get(receiverAddress);
    for (let i = 0; i < claims.length; i++) {
      if (claims[i].transactionHash === transactionHash) {
        claims.splice(i, 1);
        break;
      }
    }

    setClaimsCount(claims.length);
  }

  const submitClaim = async (event, claim: TokenClaim) => {
    const tx = await PontisContract.mint(
      chainId, 
      phoTokenAddresses.get(chainId), 
      'WrappedPhoboCoin',
      'wPHO',
      claim.amount, 
      account, 
      claim.transactionHash); 

    await tx.wait();
  }

  let currentClaims = pendingClaims.get(account); 
  if (currentClaims != null && currentClaims.length > 0) {
    return (
      <div>
        <div>
          <table>
            <caption>Pending Claims</caption>
            <thead>
              <tr>
                <th>Native Token</th>
                <th>Amount</th>
                <th>Tx Hash</th>
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
                      <td>{c.transactionHash}</td>
                      <td><button onClick={e => submitClaim(e, c)}>Claim</button></td>
                    </tr>
                  );
                })
            }
            </tbody>
          </table>
        </div>
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
