const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    const signer = await ethers.getSigner(0);

    // Search 0x000 
    const addressFoundOnEtherscan = "0x00000000005316Fe469550d85f2E5AE85b7db719";
    const stranger = await ethers.getImpersonatedSigner(addressFoundOnEtherscan);

    await signer.sendTransaction({
      to: addressFoundOnEtherscan,
      value: ethers.utils.parseEther("1.0")
    });

    await game.connect(stranger).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
