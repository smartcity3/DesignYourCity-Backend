var express = require('express')
var router = express.Router()

// Retrieve logged user details
router.get('/', function (req, res) {
    // TODO: call mongo query here

    res.send({
        fullname: "Foo of Foo's",
        email: "foo@foo.com",
        phone: "+306977777777",
        avatar: "http://localhost/image.jpg"
    });
})

// Update registered user details
router.post('/', function (req, res) {
    // TODO: call mongo query here

    res.send({
        message: "Account updated"
    });
})

// Delete user's account 
router.delete('/', function (req, res, next) {
    // TODO: call mongo query here

    res.send({
        message: "Account has been delete succefuly!"
    });
})

// Withdraw User's tokens
router.get('/withdraw', function (req, res) {
    const Web3 = require('web3');
    const path = require('path');
    const fs = require('fs');
    const Tx = require('ethereumjs-tx');

    const web3 = new Web3(Web3.givenProvider || `https://rinkeby.infura.io/v3/13bb24e6855b44f5b1f93ac483f859f1`)

    const main = async () => {
    // Who holds the token now?
    const myAddress = process.env.token_address;

    // Who are we trying to send this token to? - User's address
    const destAddress = "0xf9a034532b994125493FbAfCd8D186AB81387c97";
    const transferAmount = web3.toWei(1, "ether");

    // Determine the nonce
    const count = await web3.eth.getTransactionCount(myAddress);
    const abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../abi.json'), 'utf-8'));

    // The address of the contract which created the ERC20 token
    const contractAddress = process.env.contract_address;
    const contract = new web3.eth.Contract(abiArray, contractAddress, { from: myAddress });

    const rawTransaction = {
      "from": myAddress,
      "nonce": "0x" + count.toString(16),
      "gasPrice": "0x003B9ACA00",
      "gasLimit": "0x250CA",
      "to": contractAddress,
      "value": "0x0",
      "data": contract.methods.transfer(destAddress, transferAmount).encodeABI(),
      "chainId": 0x04
    };
    const privKey = new Buffer(process.env.private_key, 'hex');
    const tx = new Tx(rawTransaction);
    tx.sign(privKey);
    const serializedTx = tx.serialize();

    console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
    var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
}
main();
})

module.exports = router