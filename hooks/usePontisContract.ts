import { pendingClaims } from "../constants";
import PONTIS_ABI from "../contracts/Pontis.json";
import type { Pontis } from "../contracts/types";
import { TokenClaim } from "../models/token-claim";
import useContract from "./useContract";

export default function usePontisContract(contractAddress?: string) {
  let pontisContract = useContract<Pontis>(contractAddress, PONTIS_ABI);
  
  // TBD - where to put event handlers??? app.tsx?????
  pontisContract.on('Lock', (targetChainId, coinAddress, receiverAddress, amount, fee, tx) => {
    let claims = pendingClaims.get(receiverAddress);
    if (!claims) {
      claims = [];
      pendingClaims[receiverAddress] = claims;
    }

    // TODO - use BigNumber amount???
    claims.push(new TokenClaim(targetChainId, coinAddress, amount.toNumber()));
  });

  return pontisContract;
}
