# Aptos Boilerplate

This is a Boilerplate project for dapps development on Aptos network.
This project does the following:
1. Start local network with validator with [docker-compose](
https://aptos.dev/nodes/local-testnet/run-a-local-testnet)

2. Compile project using docker [Aptos cli 0.2.5](https://hub.docker.com/repository/docker/dappsdevs/aptos-cli)

3. Deploy and test smart using typescript
[ts-sdk-doc](https://aptos-labs.github.io/ts-sdk-doc/)
[transactions-with-ts-sdk](https://aptos.dev/sdks/transactions-with-ts-sdk/)


## 1. Start local network
To start local network you need to install [docker](https://www.docker.com/) & [docker-compose](https://docs.docker.com/compose/).

##### 1.1 go to the directory aptos_local_validator
```bash
cd aptos_local_validator
```


##### 1.2 run docker-compose
```bash
docker-compose up
```

##### 1.3 Use Aptos [Fewcha](https://fewcha.app/) client for local network
* Install [chrome extension](https://chrome.google.com/webstore/detail/fewcha-aptos-wallet/ebfidpplhabeedpnhjnobghokpiioolj)
* Create wallet
* Add local network
Go to Seetings
![Alt text](img/Fewcha1.PNG?raw=true "Fewcha1")
Scroll down and press "Custom Network"
![Alt text](img/Fewcha2.PNG?raw=true "Fewcha2")
Press "Add new network"
![Alt text](img/Fewcha3.PNG?raw=true "Fewcha3")
Press "Save"
![Alt text](img/Fewcha4.PNG?raw=true "Fewcha4")

##### 1.4 Top up your balance with a faucet


***

For aptos projects 
include localenv

Validator account address

# Get private staking key from docker container

Need to exec in container aptoslabs/faucet:devnet

 docker exec -it 3329af36670d bash
root@3329af36670d:/# cat ./opt/aptos/var/0/validator-identity.yaml

root@80fe71c53493:/# cat ./opt/aptos/var/0/validator-identity.yaml
---

account_address: c935a8ef7cb5899d9172a1ea0098bd4d103c40e6224f7c3e03795d0733db828b

account_private_key: "0x4debe8de4473d006b7259dfb5c4b63936bed2152d3fb492d0e77a6653a56e435"

consensus_private_key: "0x3353840950f6bf77ac8bf52fa1efaab1f25e78ad89a962dbe80cca3b76a8670d"

network_private_key: "0x68aeeee4b14ac431058848ebb143450590dbacee22c486e16e8c4098c054076a"

# Add custom network to fecha

root@80fe71c53493:/#

To access this account use https://chrome.google.com/webstore/detail/fewcha-aptos-wallet/ebfidpplhabeedpnhjnobghokpiioolj

Add custom network


![Alt text](CaptureLocalWallet.PNG?raw=true "Title")

# Add balance to validator

yarn install

yarn first_transaction
