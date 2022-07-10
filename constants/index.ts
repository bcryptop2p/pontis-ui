import { TokenClaim } from "../models/token-claim";
import { TokenInfo } from "../models/token-info";

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
  [3, "0x29Aa846FAac89fa013C735ca0Fe35C189fbA2859"], // Ropsten
  [4, "0xD65C884c50b29405C5f25DDcdE9fEee14fa5FDf9"]  // Rinkeby
]);

export const pontisAddresses: Map<number, string> = new Map<number, string>([
  [1, "nope"], // Ethereum
  [3, "0x4dEaEaa325D2856E407DB6D9738fb2440A013856"], // Ropsten
  [4, "0x79302886D0957f7271A1BFD88acE5A9e610a9E58"]  // Rinkeby
]);

// TODO - move to local storage!!!
export var pendingClaims: Map<string, TokenClaim[]> = new Map<string, TokenClaim[]>();
export var pendingNativeClaims: Map<string, TokenClaim[]> = new Map<string, TokenClaim[]>();

//export var wrappedTokens: Map<number, TokenInfo[]> = new Map<number, TokenInfo[]>();
