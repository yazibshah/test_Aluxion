const {time,loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");




describe("Doblier", function () {
    let owner;
    let addr1;
    let addr2;
    let doblier;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        doblier = await ethers.deployContract("Doblier");
        
    });

    it("Should return the correct name, symbol, and decimals", async function () {
        expect(await doblier.name()).to.equal("Yazib");
        expect(await doblier.symbol()).to.equal("Yzb");
        expect(await doblier.decimals()).to.equal(18);
    });

    it("Should return the correct total supply", async function () {
        const totalSupply = await doblier.totalSupply();
        expect(totalSupply).to.equal(100);
    });

    it("Should transfer tokens between accounts", async function () {
        await doblier.transfer(await addr1.getAddress(), 100);
        const balance = await doblier.balanceOf(await addr1.getAddress());
        expect(balance).to.equal(90);
    });

    it("Should not transfer more tokens than the balance", async function () {
        const initialBalance = await doblier.balanceOf(await owner.getAddress());
        await expect(doblier.connect(addr1).transfer(await owner.getAddress(), 100)).to.be.revertedWith("balance too low");
    });


    it("Should approve allowance for spender", async function () {
        await doblier.approve(await addr1.getAddress(), 1000);
        const allowance = await doblier.allowance(await owner.getAddress(), await addr1.getAddress());
        expect(allowance).to.equal(1000);
    });

    it("Should transfer tokens from one account to another by approved spender", async function () {
        await doblier.approve(await addr1.getAddress(), 1000);
        await doblier.connect(addr1).transferFrom(await owner.getAddress(), await addr2.getAddress(), 100);
        const balance = await doblier.balanceOf(await addr2.getAddress());
        expect(balance).to.equal(90);
    });

    it("Should not transfer tokens from one account to another by unapproved spender", async function () {
        await expect(doblier.connect(addr1).transferFrom(await owner.getAddress(), await addr2.getAddress(), 100)).to.be.revertedWith("allowance too low");
    });

    it("Should apply correct tax on transfer", async function () {
        await doblier.connect(owner).transfer(await addr1.getAddress(), 100);
        const ownerBalance = await doblier.balanceOf(await owner.getAddress());
        const addr1Balance = await doblier.balanceOf(await addr1.getAddress());
        expect(ownerBalance).to.equal(10);
        expect(addr1Balance).to.equal(90);
    });

    
});
