import PONTIS_ABI from "../contracts/Pontis.json";
import type { Pontis } from "../contracts/types";
import { TokenClaim } from "../models/token-claim";
import useContract from "./useContract";

export default function usePontisContract(contractAddress?: string) {
  let pontisContract = useContract<Pontis>(contractAddress, PONTIS_ABI);
  console.log('use Pontis contract called');
  return pontisContract;
}
