const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");


describe("Wallet", ()=> {
  let myAddress;
  let address1;
  let addr;
  it("Depolys Contract", async  () => {
    const Wallet = await ethers.getContractFactory("Wallet");
    const [myAddress, address1, ...addr] = await ethers.getSigners();
    const wallet = await Wallet.deploy();
    await wallet.deployed();


    describe("Initial", async() => {
      it("Contract address balance should be equal to zero" , async () => {
        const provider = waffle.provider;
        expect(await wallet.my_balance()).to.equal(0);
        expect(await wallet.total_balance()).to.equal(0);
        expect(await provider.getBalance(wallet.address)).to.equal(0);
        })
    })
    describe("Deposit From Owner Address", async() => {
      it("Should Send the Ethers To the Contract" , async () => {
        const provider = waffle.provider;

        await myAddress.sendTransaction({
          to: wallet.address,
          value:1000,
          gasLimit: 50000,
        });

        expect(await provider.getBalance(wallet.address)).to.equal(1000);
        expect(await wallet.total_balance()).to.equal(1000);
        expect(await wallet.my_balance()).to.equal(1000);
      })
    })
    describe("Deposit From Other Address", async() => {
      it("Should Send the Ethers To the Contract" , async () => {
        const provider = waffle.provider;

        await address1.sendTransaction({
          to: wallet.address,
          value:5000,
          gasLimit: 50000,
        });

        expect(await provider.getBalance(wallet.address)).to.equal(6000);
      
        
        expect(await wallet.connect(address1.address).my_balance()).to.equal(5000);
      })
    })
    describe("Withdraw From Owner Address", async() => {
      it("Should Send the Ethers To the Contract" , async () => {
        const provider = waffle.provider;
         const withdraw =await wallet.withdraw_balance(500);
         await withdraw.wait();
        // expect(await wallet.withdraw_balance(500)).to.equal(500);
        expect(await wallet.my_balance()).to.equal(500);
        expect(await wallet.total_balance()).to.equal(5500);
        expect(await provider.getBalance(wallet.address)).to.equal(5500);

      })
    })
    describe("Withdraw From Other Address", async() => {
      it("Should Send the Ethers To the Contract" , async () => {
        const provider = waffle.provider;
         const withdraw =await wallet.connect(address1).withdraw_balance(500);
         await withdraw.wait();
        // expect(await wallet.withdraw_balance(500)).to.equal(500);
        expect(await wallet.connect(address1.address).my_balance()).to.equal(4500);
        expect(await wallet.total_balance()).to.equal(5000);
        expect(await provider.getBalance(wallet.address)).to.equal(5000);

      })
    })

  });
});
