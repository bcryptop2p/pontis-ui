import type { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import usePontisContract from "../hooks/usePontisContract";
import TokenBalance from "../components/TokenBalance";
import { metaMaskNetworks, pendingNativeClaims } from "../constants";
import { TokenClaim } from "../models/token-claim";
import ERC20_ABI from "../contracts/ERC20.json";
import { TokenInfo } from "../models/token-info";

const WrappedTokenBalance = () => {
  const { chainId, account, library } = useWeb3React<Web3Provider>();
  const PontisContract = usePontisContract();

  const [wrappedTokensInfo, setWrappedTokensInfo] = useState<TokenInfo[]>([]);

  useEffect(() => {
    loadWrappedTokens();

    PontisContract.on('Burn', onPontisBurn);
    PontisContract.on('Mint', onPontisMint);

    return () => { 
      PontisContract.off('Burn', onPontisBurn);
      PontisContract.off('Mint', onPontisMint);
    };
  },[chainId, account])

  const loadWrappedTokens = () => {
    console.log('loading WrappedTokens info');
    let tokens = PontisContract.getWrappedTokens()
      .then(tokens => {
        console.log('WrappedTokens info loaded');
        setWrappedTokensInfo([]); // temp hack - otherwise the component wouldn't re-render
        setWrappedTokensInfo(tokens);
        //wrappedTokens.set(chainId, tokens);
      });
  }

  const onPontisBurn = function(token, amount, receiver, nativeChainId, nativeToken, transactionHash, tx) {
    let claims = pendingNativeClaims.get(receiver);
    if (!claims) {
      claims = [];
      pendingNativeClaims.set(receiver, claims);
    }

    // TODO - use BigNumber amount???
    claims.push(new TokenClaim(0, nativeChainId, nativeToken, amount.toNumber(), tx.transactionHash));

    loadWrappedTokens();
  };
  
  const onPontisMint = (coinAddress, amount, receiverAddress, transactionHash, tx) => {
    loadWrappedTokens();
  }

  const unwrapToken = async (event, token: TokenInfo, amount: number) => {
    let erc20 = new Contract(token.wrappedTokenAddress, ERC20_ABI, library.getSigner(account));
    await erc20.approve(PontisContract.address, amount);

    let transactionHash = ""; // TODO - omit transactionHash on burn????

    const tx = await PontisContract.burn(token.wrappedTokenAddress, amount, account, transactionHash, {
      //value: ethers.utils.parseEther('0.0000000000000001'),
      gasLimit: 500000
    }); 

    await tx.wait();
  }
  
  if (wrappedTokensInfo != null && wrappedTokensInfo.length > 0) {
    return (
      <div>
        <table className="wrapped-tokens-table">
          <caption>Wrapped Tokens</caption>
          <thead>
            <tr>
              <th>Wrapped Token</th>
              <th>Balance</th>
              <th>Native Chain</th>
              <th>Native Token</th>
              <th>Amount to Unwrap</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            wrappedTokensInfo
              .map((t, i) => {

                let amountToUnwrap = 0;
                const amountToUnwrapChange = (input) => {
                  amountToUnwrap = input.target.value;
                }

                return (
                  <tr key={i}>
                    {/* <td>{t.wrappedTokenAddress}</td> */}
                    <td>wPHO</td>
                    <td>
                      <TokenBalance tokenAddress={t.wrappedTokenAddress} />
                    </td>
                    <td>{metaMaskNetworks.get(t.chainId)}</td>
                    {/* <td>{t.tokenAddress}</td> */}
                    <td>PHO</td>
                    <td>
                      <input onChange={amountToUnwrapChange} type="number" name="amountToUnwrap" />
                    </td>
                    <td>
                      <button onClick={e => unwrapToken(e, t, amountToUnwrap)}>Unwrap</button>
                    </td>
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

  return (
    <p>No Wrapped Tokens</p>
  );
};

export default WrappedTokenBalance;
