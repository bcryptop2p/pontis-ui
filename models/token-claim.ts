export class TokenClaim {
  targetChainId: number;
  //nativeChainId: number;
  nativeToken: string;
  
  // TODO - use BigNumber amount???
  amount: number;
  transactionHash: string;

  constructor(
    targetChainId: number,
    //nativeChainId: number,
    nativeToken: string,
    amount: number,
    transactionHash: string) {

    this.targetChainId = targetChainId;
    //this.nativeChainId = nativeChainId;
    this.nativeToken = nativeToken;
    this.amount = amount;
    this.transactionHash = transactionHash;
  }
}
