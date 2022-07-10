import { Provider, Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { metaMaskNetworks, pendingClaims, phoTokenAddresses } from "../constants";
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
      claim.nativeChainId, 
      phoTokenAddresses.get(claim.nativeChainId), 
      'WrappedPhoboCoin',
      'wPHO',
      claim.amount, 
      account, 
      claim.transactionHash); 
      // TODO - dynamic symbol and name, decimals

    await tx.wait();
  }

  let currentClaims = pendingClaims.get(account); 
  if (currentClaims != null && currentClaims.length > 0) {
    return (
      <div>
        <div>
          <table className="claims-table">
            <caption>Pending Claims</caption>
            <thead>
              <tr>
                <th>Native Token</th>
                <th>Amount</th>
                <th>Transaction Hash</th>
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
                      <td>{ parseFloat(formatUnits(c.amount, 18)).toFixed(18) }</td>
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
          .claims-table {
            border-collapse: collapse;
            margin: 25px auto;
            min-width: 90%;
          }
  
          .claims-table caption {
            background: #eee;
            color: #003080;
            font-weight: bolder;
            padding: 10px;
          }
  
          .claims-table thead tr {
            background-color: #003080;
            color: #fff;
            text-align: center;
          }
  
          .claims-table th,
          .claims-table td {
            padding: 10px 15px;
          }
  
          .claims-table tbody tr {
            border-bottom: 1px solid #ddd;
          }
          
          .claims-table tbody tr:last-of-type {
            border-bottom: 2px solid #ddd;
          }
      `}</style>
      </div>
    );
  };
  
  return (
    <p>No Pending Claims</p>
  );
}

export default PendingClaims;
