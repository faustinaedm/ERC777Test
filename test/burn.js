
const { accounts, contract, web3 } = require('@openzeppelin/test-environment');

const { expect } = require('chai');
require('chai').should();
var chai = require('chai');
var BN = require('bn.js');
var bnChai = require('bn-chai');
chai.use(bnChai(BN));
const { expectEvent, singletons, constants } = require('@openzeppelin/test-helpers');
//const { ZERO_ADDRESS } = constants;
const zero_address = '0x0000000000000000000000000000000000000000';

const ERC777Token = artifacts.require('ERC777Token');
let TokenInstance;
describe('ERC777Token', function () {
    this.timeout(10000);
    const [registryFunder, creator, operator] = accounts;
    /*const operator = accounts[2];
    creator = accounts[1];*/
    beforeEach(async function () {
        this.erc1820 = await singletons.ERC1820Registry(registryFunder);

        this.token = await ERC777Token.new({ from: creator });
        /*   return ERC777Token.deployed().then(instance => {
               TokenInstance = instance;
           });*/
    });

    it('assigns the initial total supply to the creator', async function () {
        const totalSupply = await this.token.totalSupply();
        const creatorBalance = await this.token.balanceOf(creator);

        creatorBalance.should.be.bignumber.equal(totalSupply);

        await expectEvent.inConstruction(this.token, 'Transfer', {
            from: zero_address,
            to: creator,
            value: totalSupply,
        });
    });

    it('allows operator burn', async function () {
        const creatorBalance = await this.token.balanceOf(creator);
        const data = web3.utils.sha3('Simple777Data');
        const operatorData = web3.utils.sha3('Simple777OperatorData');

        await this.token.authorizeOperator(operator, { from: creator });
        await this.token.operatorBurn(creator, creatorBalance, data, operatorData, { from: operator });
        expect(await this.token.balanceOf(creator)).to.eq.BN("0");

    });
    it("authorizes an operator", () => {
        return TokenInstance.authorizeOperator(operator, { from: creator }).then(receipt => {
            assert.equal(receipt.logs.length, 1, "Correct number of logs");
            assert.equal(receipt.logs[0].event, "AuthorizedOperator", "Correct event");
            assert.equal(receipt.logs[0].args.operator, operator, "Correct operator");
            assert.equal(receipt.logs[0].args.creator, creator, "Correct token holder");
            return TokenInstance.isOperatorFor(operator, creator);
        }).then(bool => {
            assert(bool, "Operator is authorized");
        });
    });
});