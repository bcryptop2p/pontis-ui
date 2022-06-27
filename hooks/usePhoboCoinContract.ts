import PHOBO_COIN_ABI from "../contracts/PhoboCoin.json";
import type { PhoboCoin } from "../contracts/types";
import useContract from "./useContract";

export default function usePhoboCoinContract(contractAddress?: string) {
  return useContract<PhoboCoin>(contractAddress, PHOBO_COIN_ABI);
}
