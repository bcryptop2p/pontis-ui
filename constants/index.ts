
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
    [3,"Ropsten"],
    [4, "Rinkeby"]
  ]);

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42];

  export const PHO_TOKEN_ADDRESS = "0xec8D4416e4BAB1Dd480c4eD93dAc0c331d85447B";
  export const PONTIS_ADDRESS = "0x2E46CdD5e3C2afd33eaC7a20481a0B4C0893e37b";