import PONTIS_ABI from "../contracts/Pontis.json";
import type { Pontis } from "../contracts/types";
import { useWeb3React } from "@web3-react/core";
import useContract from "./useContract";
import { pontisAddresses } from "../constants";

export default function usePontisContract() {
  const { chainId } = useWeb3React();

  let pontisContract = useContract<Pontis>(pontisAddresses.get(chainId), PONTIS_ABI);

  return pontisContract;
}
