import PHOBO_COIN_ABI from "../contracts/PhoboCoin.json";
import type { PhoboCoin } from "../contracts/types";
import { useWeb3React } from "@web3-react/core";
import useContract from "./useContract";
import { phoTokenAddresses } from "../constants";

export default function usePhoboCoinContract() {
  const { chainId } = useWeb3React();

  return useContract<PhoboCoin>(phoTokenAddresses.get(chainId), PHOBO_COIN_ABI);
}
