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
    [3, "0x5D28f93d55ED0EE7A0f8003c3E96fa9Fc3a7FB07"], // Ropsten
    [4, "0x213b6FB8735bfBdCFb54929D21Ac045f5A68EF0a"]  // Rinkeby
  ]);

  export const pontisAddresses: Map<number, string> = new Map<number, string>([
    [1, "nope"], // Ethereum
    [3, "0xDEE88d652026EFeF17BfeEd36997188aeFfCE40F"], // Ropsten
    [4, "0x71a5E47d18adC93BeF97F5D8d24865bed7E4F34b"]  // Rinkeby
  ]);
  
  // TODO - move to local storage!!!
  export var pendingClaims: Map<string, TokenClaim[]> = new Map<string, TokenClaim[]>();
