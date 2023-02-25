// import { ethers}  from "ethers";
// import TokenWallet from "./Token.js";
// import Format  from "./Format.js";
// import GasFormat from "./GasFormat.js";
// import Transaction from "./Transaction.js";
// import Provider from "./Provider.js";
// import Contract from "./Contract.js";
// const abi = `[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]`


// const privatekeyRegExp =  /^0x[0-9a-fA-F]/g;
//   export class Wallet {
//     #mnemonic:any;
//     Wallet:any;
//     provider:any
//     decimals:number;
//     // Token:any;
    
    
    
//     constructor(){
//       if(window.ethereum)
//       this.provider = provider ;
//       this.decimals = 18;
    
    
//     // getter for address
//     get address(){
//       return  this.signer.getAddress ;
//     }
    
//     // promis => get balance of the wallet
//     get balance(){
//       return new Promise(async (resolve,reject) => {
//         this.signer.getBalance().then(r);
//         })
        
//       })
      
//     } 
    
//     // signer 
//     get signer (){
//       const __provider = this.provider;
//       return new Promise((r,j) => {
//       __provider.getSigner().then(r);
//       })
//     }
//     // send 
//     // @params amount is an ethers string or an object used to send ethers 
//     send(amount:any,to:any){
//     return new Promise((resolve,reject) => {
      
//       // creating factory 
//       const factory = Format.Factory(this.decimals);
//       var tx:any = {
        
//       }
//       if(typeof amount === "object"){
//         amount.amount = factory(amount);
//         tx.to = amount.to ;
//       } else {
//         tx.to = to ;
//         tx.value = factory(amount) ;
//       }
      
//       //sending transaction.... promise
//       this.signer.sendTransaction(tx).then((result:any) => {
//         result.Transaction = new Transaction(tx.value,18);
//         resolve(result);
//       })
//         .catch((err:any) => reject(err))
//     })
//     } // working
    
//     // estimateGas before sending a transaction Promise
//     estimateBeforeSend(amount:any,to:any){
//       const wallet = this.signer ;
//       return new Promise((resolve,reject) => {
//         const factory = Format.Factory(18);
//         const tx = {
//           to : to,
//           value : factory(amount)
//         }
//         // estimating gas 
//         this.signer.estimateGas(tx).then((c:any) => {
//           const estimatedGas = new Promise((resolve1,reject1) => {
//           resolve1(new GasFormat(tx,c,wallet));
//           });
//           resolve(estimatedGas)
//         })
//       })
//     } 
//     // estimate gas... 
//     estimateGas (amount:any,to:any){
//       const factory = Format.Factory(this.decimals);
//         const tx = {
//           to : to,
//           value : factory(amount)
//         }
//         return new Promise((resolve,reject) => {
//           this.Wallet.estimateGas(tx).then((res:any) => {
//             resolve(new GasFormat.Static(tx,res))
//           })
//         })
//     }
    
//     // using the ERC20 Wallet
//     Token(addr:string){
      
//       return new TokenWallet(this.provider,,addr);
//     }
    
//     static get Contract(){
//       return Contract;
//     }
    
//     // Format Format
//     static get Format(){
//       return Format;
//     }
//   }

// /*Documentation 
// Wallet is A class that has methods to interact to an ethers Wallet
// Wallet {
//     Wallet: new ether.Walllet; 
//     provider: JsonRpcProvider
//     decimals:number;
    
//     get address:string = wallet address 
//     get privateKey:string = private Key 
//     get balance:Promise<Format> = Formated balance
    
//     methods // 
    
//     send:Promise<ethers tx> = send tokens 
//     estimateBeforeSend:Promiss = estemites gas before sending them
//     estimateGas:Promise<GasFormat> estimating gas 
//     Token:TokenWallet
    
// }

// */



// export default Wallet;