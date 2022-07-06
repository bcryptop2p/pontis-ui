import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { SetStateAction, useEffect, useState } from "react";
import { Pontis } from "../'./contracts/types'";
import usePontisContract from "../hooks/usePontisContract";
import useTokenBalance from "../hooks/useTokenBalance";
import { parseBalance } from "../util";
import TokenBalance from "../components/TokenBalance";
import { phoTokenAddresses } from "../constants";

type TokenInfo = {
  chainId: number;
  tokenAddress: string;
  wrappedTokenAddress: string;
  //symbol: string;
};

const WrappedTokenBalance = () => {
  const { chainId, account, library } = useWeb3React<Web3Provider>();
  const PontisContract = usePontisContract();

  const [wrappedTokensInfo, setWrappedTokensInfo] = useState<TokenInfo[]>([]);

  useEffect(() => {
    let tokens = PontisContract.getWrappedTokens()
      .then(tokens => {
        setWrappedTokensInfo(tokens);
      });
  },[chainId, account])

  const unwrapToken = async (event, token: TokenInfo) => {
    // const tx = await PontisContract.burn(
    //   chainId, 
    //   phoTokenAddresses.get(chainId), 
    //   'WrappedPhoboCoin',
    //   'wPHO',
    //   claim.amount, 
    //   account, 
    //   claim.transactionHash); 

    // await tx.wait();
  }
  
  if (wrappedTokensInfo != null && wrappedTokensInfo.length > 0) {
    return (
      <div>
        <table className="wrapped-tokens-table">
          <caption>Wrapped Tokens</caption>
          <thead>
            <tr>
              <th>Wrapped Token</th>
              <th>Amount</th>
              <th>Native ChainId</th>
              <th>Native Token</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            wrappedTokensInfo
              .map((t, i) =>
              {
                return (
                  <tr key={i}>
                    <td>{t.wrappedTokenAddress}</td>
                    <td>
                      {(
                         <TokenBalance tokenAddress={t.wrappedTokenAddress} />
                      )}
                    </td>
                    <td>{t.chainId}</td>
                    <td>{t.tokenAddress}</td>
                    <td><button onClick={e => unwrapToken(e, t)}>Unwrap</button></td>
                  </tr>
                );
              })
          }
          </tbody>
        </table>
      <style jsx>{`
        .wrapped-tokens-table {
          border-collapse: collapse;
          margin: 25px auto;
          min-width: 90%;
        }

        .wrapped-tokens-table caption {
          background: #eee;
          color: #003080;
          font-weight: bolder;
          padding: 10px;
        }

        .wrapped-tokens-table thead tr {
          background-color: #003080;
          color: #fff;
          text-align: center;
        }

        .wrapped-tokens-table th,
        .wrapped-tokens-table td {
          padding: 10px 15px;
        }

        .wrapped-tokens-table tbody tr {
          border-bottom: 1px solid #ddd;
        }
        
        .wrapped-tokens-table tbody tr:last-of-type {
          border-bottom: 2px solid #ddd;
        }
      `}</style>
      </div>
    );
  };

  // return (
  //   // <p>
  //   //   {`${symbol} Balance`}: {parseBalance(data ?? 0)}
  //   // </p>
  // );
  
  return (
    <p>No Wrapped Tokens</p>
  );
};

export default WrappedTokenBalance;
