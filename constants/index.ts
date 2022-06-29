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
  export const supportedMetamaskNetworks = [1, 3, 4]; //, 5, 42];

  // todo env variables - dotenv package
  export const phoTokenAddresses: Map<number, string> = new Map<number, string>([
    [1, "naaaah, too expensive!!!"], // Ethereum
    [3, "0xD43DaA155e54C103B10f9588179339651Cb5d0fF"], // Ropsten
    [4, "0xcFDb1BE3D7afbcdf99dD54dAE43819Ed686B98B8"]  // Rinkeby
  ]);

  export const pontisAddresses: Map<number, string> = new Map<number, string>([
    [1, "nope"], // Ethereum
    [3, "0x884a33dA3Fd4164b1c3a9FB0509b7ba75eF2F95b"], // Ropsten
    [4, "0x0f5cf0f68b8F94dB239bc43Cc18a35fe83243541"]  // Rinkeby
  ]);
  
  // TODO - move to local storage!!!
  export var pendingClaims: Map<string, TokenClaim[]> = new Map<string, TokenClaim[]>();
