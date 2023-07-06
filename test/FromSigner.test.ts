import { describe, it, expect} from "vitest";
import  Wallet from "./Wallet";
import { ethers } from "ethers";
import {abi, bin} from "./tokenBin";

const provider = new Wallet.Provider();


const wallet0 = new ethers.Wallet("0x23d3891b74448485485c2a53965ab8b148d167e0a42bcc7f9ca65d0361b63239",provider);
const wallet1 = new ethers.Wallet("0x75d65b3f43b5a97104270f05d61fb18c767169848d82d59d5e320e47e3f69738",provider);
const getWallet =  async ():Promise<any> => {
   const signer = await provider.getSigner();
   const wallet = new Wallet.FromSigner(signer);
   return wallet;

}
describe("Test Wallet From Signer", async () => {
   
   const wallet = await getWallet();
   it("Wallet Metadatadata", async () => {
      expect(await wallet.address).toBe("0x27660DC47F6046286A45f6F2462a08c55f96566E")
      expect( wallet.privateKey).toBeUndefined();
      
   })
   
   it("Test Wallet UseAs and useAt", () => {
      
      const walletOriginal = new Wallet(wallet0, provider);
      // new Wallet 
      const newWallet = walletOriginal.useAs(wallet1)
      const sameWalletNewProvider = walletOriginal.useAt("http://localhost:8000");
      // expect wallet to be not equal
      expect(newWallet.privateKey).not.toBe(walletOriginal.privateKey);
      // expect sameWalletNewProvider to have deferent Provider 
      expect(sameWalletNewProvider.provider.connection.url).toBe("http://localhost:8000");
   })
   
   it("Change Wallet and Provider", () => {
      const wallet = new Wallet(wallet0, provider);
      // make a copy of the original
      const original = wallet;
      // switch account
      wallet.switchAccount("0x75d65b3f43b5a97104270f05d61fb18c767169848d82d59d5e320e47e3f69738");
      expect(wallet.address).toBe(wallet1.address);
      wallet.switchNetwork("http://localhost:8000");
      expect(wallet.provider.connection.url).toBe("http://localhost:8000");
   })
   
   
})



describe("Real Transaction  of Wallet", async () => {
   const amountFormat = new Wallet.Format("0.000-000-0001");
   const wallet = await getWallet();
   it("Send Ether with generic types ", async () => {
      const transaction =  await wallet.send("0.000-000-0001",wallet1.address);
     expect(transaction.Transaction.amount).toBe(amountFormat.wei);
     expect(transaction.Transaction.done).toBe(true);
      console.log(transaction);
   })
   
   it("send Ether with complex types", async () => {
      const transaction = await wallet.send(new Wallet.Format("0.000-000-0001"),wallet1);
     expect(transaction.Transaction.amount).toBe(amountFormat.wei);
     expect(transaction.Transaction.done).toBe(true);
      console.log(transaction);
   })
   
   it("send Ether using BigNumber", async () => {
      const amountFormat = new Wallet.Format.Wei("1000000");
      const transaction = await wallet.send(ethers.BigNumber.from('1000000'),wallet1);
      expect(transaction.Transaction.amount).toBe(amountFormat.wei);
     expect(transaction.Transaction.done).toBe(true);
   })
})

describe("Estimate Gas", async () => {
   const wallet = await getWallet();
   
   it('Estimate Gas using generic types',async () => {
      const gasFee = await wallet.estimateGas("0.0001",wallet1.address);
      const estimatedGas =  gasFee.estimatedGas;
      const toSpend = gasFee.toSpend;
      
      const total = Wallet.utils.BN(toSpend).add(estimatedGas).toString();
      expect(total).toBe(gasFee.totalWei);
      console.log({gasFee})
   })
   
   it("test estimate gas using complex types", async () => {
      const gasFee = await wallet.estimateGas(new Wallet.Format("0.000-000-0001"),wallet1);
      const estimatedGas =  gasFee.estimatedGas;
      const toSpend = gasFee.toSpend;
      
      const total = Wallet.utils.BN(toSpend).add(estimatedGas).toString();
      expect(total).toBe(gasFee.totalWei);
      console.log({gasFee})
   })
   
   it("test estimate gas using BigNumber", async () => {
      const gasFee = await wallet.estimateGas(Wallet.utils.BN("1000000"),wallet1);
      const estimatedGas =  gasFee.estimatedGas;
      const toSpend = gasFee.toSpend;
      
      const total = Wallet.utils.BN(toSpend).add(estimatedGas).toString();
      expect(total).toBe(gasFee.totalWei);
      console.log({gasFee})
   })
   
})


describe("Transfer Token", async () => {
   const wallet = await getWallet();
   const tokenFactory = new ethers.ContractFactory(abi,bin,wallet.signer);
   const _token = await tokenFactory.deploy();
   const token = wallet.Token(_token);
   
   
   // send token 
   it("send token using generic types", async () => {
      const amountFormat = new Wallet.Format("0.000-000-0001");
      const transferToken = await token.send("0.000-000-0001", wallet1.address);
      // expect the amount to transfer is 0.0000000001
      expect(transferToken.Transaction.amount).toBe(amountFormat.wei);
      // expect transaction value is 0.0000000001
      expect(transferToken.Transaction.done).toBe(true);
      console.log({transferToken});
   })
   // uaing complex type
   it("send token using complex types", async () => {
      const amountFormat = new Wallet.Format("0.000-000-0001");
      const transferToken = await token.send(new Wallet.Format("0.000-000-0001"), wallet1);
      // expect the amount to transfer is 0.0000000001
      expect(transferToken.Transaction.amount).toBe(amountFormat.wei);
      // expect transaction value is 0.0000000001
      expect(transferToken.Transaction.done).toBe(true);
      console.log({transferToken});
   })
   // using BigNumber
   it("send token using complex types with BigNumber", async () => {
      const amountFormat = new Wallet.Format.Wei('100000000');
      const transferToken = await token.send(ethers.BigNumber.from("100000000"), wallet1.address);
      // expect the amount to transfer is 0.0000000001
      expect(transferToken.Transaction.amount).toBe(amountFormat.wei);
      // expect transaction value is 0.0000000001
      expect(transferToken.Transaction.done).toBe(true);
      console.log({transferToken});
   })
   
   it('Estimate Token Gas using generic types',async () => {
      const gasFee = await token.estimateGas("0.0001",wallet1.address);
      const estimatedGas =  gasFee.estimatedGas;
      const toSpend = gasFee.toSpend;
      
      const total = Wallet.utils.BN(toSpend).add(estimatedGas).toString();
      expect(total).toBe(gasFee.totalWei);
      console.log({gasFee})
   })
   
});