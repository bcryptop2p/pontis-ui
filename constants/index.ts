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
    [3, "0xaCB393e3d25084756Dc960D43e875935523715cD"], // Ropsten
    [4, "0x5D28f93d55ED0EE7A0f8003c3E96fa9Fc3a7FB07"]  // Rinkeby
  ]);

  export const pontisAddresses: Map<number, string> = new Map<number, string>([
    [1, "nope"], // Ethereum
    [3, "0x91a69797aaB570Ba197b407f38e5836F9eEA7Dda"], // Ropsten
    [4, "0xDEE88d652026EFeF17BfeEd36997188aeFfCE40F"]  // Rinkeby
  ]);
  
  // TODO - move to local storage!!!
  export var pendingClaims: Map<string, TokenClaim[]> = new Map<string, TokenClaim[]>();
