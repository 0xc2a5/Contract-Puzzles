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

    const address = "0x0000000000000000000000000000000000000000";
    const stranger = await ethers.getImpersonatedSigner(address);

    await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther("1.0")
    });

    await game.connect(stranger).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
