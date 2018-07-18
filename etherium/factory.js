import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x0078d25783F5d9Ab9A016F407d06b2a12457D108"
);

export default instance;