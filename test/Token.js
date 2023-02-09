const { expect } = require('chai');

describe('Token Properties', function () {
    it('should have the correct name', async function () {
        const name = "Transition Technologies";
        expect(await getTokenName()).to.equal(name);
    });

    it('should have the correct symbol', async function () {
        const symbol = "$TTPSC";
        expect(await getTokenSymbol()).to.equal(symbol);
    });

    it('should have the correct number of decimals', async function () {
        const decimals = 18;
        expect(await getTokenDecimals()).to.be.bignumber.equal(decimals);
    });

    it('should have the correct cap', async function () {
        const maxSupply = 1000000;
        const decimals = 18;
        const cap = maxSupply * 10 ** decimals;
        expect(await getTokenCap()).to.be.bignumber.equal(cap);
    });

    it('should have the correct total supply', async function () {
        const maxSupply = 1000000;
        const decimals = 18;
        const totalSupply = maxSupply * 10 ** decimals;
        expect(await getTokenTotalSupply()).to.be.bignumber.equal(totalSupply);
    });

    it('should have the correct owner', async function () {
        const owner = accounts[0];
        expect(await getTokenOwner()).to.equal(owner);
    });
});

describe('Mint', function () {
    it('should mint the correct amount', async function () {
        const initialSupply = await getTokenTotalSupply();
        const amountToMint = 1000 * 10 ** (await getTokenDecimals());
        await mint(amountToMint);
        expect(await getTokenTotalSupply()).to.be.bignumber.equal(initialSupply.add(amountToMint));
    });

    it('should not mint over the cap', async function () {
        const initialSupply = await getTokenTotalSupply();
        const maxSupply = await getTokenCap();
        const amountToMint = 1000 * 10 ** (await getTokenDecimals());
        await mint(maxSupply.sub(initialSupply).add(amountToMint));
        expect(await getTokenTotalSupply()).to.be.bignumber.equal(maxSupply);
    });
});