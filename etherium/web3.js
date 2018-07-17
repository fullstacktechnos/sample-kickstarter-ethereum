import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // In browser and metamask is running.
  
  web3 = new Web3(window.web3.currentProvider);

} else {
  // on the server *OR* the user is not running metamask

  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/" + process.env.INFURA_APIKEY // infura network url.
  );

  web3 = new Web3(provider);
}

export default web3;
