const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MarketCoinModule", (m) => {
  const coin = m.contract("MarketCoin");

  return { coin };
});