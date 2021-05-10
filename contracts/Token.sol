pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract ERC777Token is ERC777 {
    uint256 private _totalSupply;

    constructor() public ERC777("TokenName", "TKN", new address[](0)) {
        _totalSupply = 10000000 * 10**18;

        _mint(msg.sender, _totalSupply, "", "");
    }
}
