pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/utils/introspection/IERC1820Registry.sol";
import "@openzeppelin/contracts/utils/introspection/ERC1820Implementer.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Sender.sol";

contract ERC777TokensSenderMock is IERC777Sender, ERC1820Implementer {
    bytes32 public constant TOKENS_SENDER_INTERFACE_HASH =
        keccak256("ERC777TokensSender");

    event SendData(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes userData,
        bytes operatorData
    );

    function senderFor(address account) public {
        _registerInterfaceForAddress(TOKENS_SENDER_INTERFACE_HASH, account);
    }

    function tokensToSend(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external override {
        emit SendData(operator, from, to, amount, userData, operatorData);
    }
}
