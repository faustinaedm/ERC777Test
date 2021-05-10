
const { expect } = require('chai');
var chai = require('chai');
var BN = require('Bn.js');
const { singletons, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
//const BN = require('bn.js');
//chai.use(require('chai-bn')(BN));
const ERC777Token = artifacts.require('ERC777Token');
contract('ERC777Token', function ([_, registryFunder, creator, operator, accounts, anyone, defaultOperatorA, defaultOperatorB]) {

    const _decimals = new BN(18);
    const _initSupply = new BN('10000000000000000000000000');
    const name = 'TokenName';
    const symbol = 'TKN';
    const defaultOperators = [defaultOperatorA, defaultOperatorB];
    beforeEach(async function () {
        const erc1820 = await singletons.ERC1820Registry(registryFunder);
        this.token = await ERC777Token.new({ from: creator });
    });
    it('retrieve the name of the token', async function () {
        expect(await this.token.name()).to.equal(name);
    });
    it('shows the symbol of the token', async function () {
        expect(await this.token.symbol()).to.equal(symbol);
    });
    it('returns decimals for the token', async function () {
        expect(await this.token.decimals()).to.be.a.bignumber.equal(_decimals);
    });
    it('returns a granularity of 1', async function () {
        expect(await this.token.granularity()).to.be.bignumber.equal('1');
    });
    it('returns the total supply', async function () {
        expect(await this.token.totalSupply()).to.be.bignumber.equal((_initSupply));
    });
    it('has no default operators', async function () {
        expect(await this.token.defaultOperators()).to.be.empty;
    });
    describe('balanceOf', function () {
        context('for an account with no tokens', function () {
            it('returns zero', async function () {
                expect(await this.token.balanceOf(anyone)).to.be.bignumber.equal('0');
            });
        });
    });

});


