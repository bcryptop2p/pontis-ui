import PONTIS_ABI from "../contracts/Pontis.json";
import type { Pontis } from "../contracts/types";
import useContract from "./useContract";

export default function usePontisContract(contractAddress?: string) {
  return useContract<Pontis>(contractAddress, PONTIS_ABI);
}
