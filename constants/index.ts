  import { TokenClaim } from "../models/token-claim";

  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://ethereumnode.defiterm.io",
    3: "https://ethereumnode.defiterm-dev.net"
  };

  export const metaMaskNetworks: Map<number, string> = new Map<number, string>([
    [1, "Ethereum"],
    [3, "Ropsten"],
    [4, "Rinkeby"]
  ]);

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42];

  // todo env variables - dotenv package  
  export const PHO_TOKEN_ADDRESS = "0xD43DaA155e54C103B10f9588179339651Cb5d0fF";
  export const PONTIS_ADDRESS = "0x884a33dA3Fd4164b1c3a9FB0509b7ba75eF2F95b";
  
  // TODO - move to local storage!!!
  export const pendingClaims: Map<string, TokenClaim[]> = new Map<string, TokenClaim[]>([
    ["0xBA62fbfBBF666599e26e14Ba457DE354A04821CE", [
      new TokenClaim(3, PHO_TOKEN_ADDRESS, 3450000),
      new TokenClaim(4, PHO_TOKEN_ADDRESS, 9999000),
      new TokenClaim(4, PHO_TOKEN_ADDRESS, 56000000),
    ]]
  ]);
