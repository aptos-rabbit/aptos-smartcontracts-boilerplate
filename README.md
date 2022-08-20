# Aptos Boilerplate

This is a Boilerplate project for dapps development on Aptos network.
This project does the following:
1. Start local network with validator with [docker-compose](
https://aptos.dev/nodes/local-testnet/run-a-local-testnet)

2. Compile project using docker [Aptos cli 0.2.5](https://hub.docker.com/repository/docker/dappsdevs/aptos-cli)

3. Deploy smart using TypeScript
4. Test smart using TypeScript
[ts-sdk-doc](https://aptos-labs.github.io/ts-sdk-doc/)
[transactions-with-ts-sdk](https://aptos.dev/sdks/transactions-with-ts-sdk/)

## Prerequisites

- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [Node.js 16.17.0 LTS](https://nodejs.org/en/)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install)

## 1. Start local network
##### 1.1 Clone the project
```bash
git clone TODO!!!!
```

##### 1.2 Install dependencies
```bash
yarn
```

##### 1.3 run local network
Using Docker (recommended):
```bash
yarn run_local_network
```

Using Aptos CLI:
```bash
yarn run_local_network_with_cli
```

##### 1.4 Use Aptos [Fewcha](https://fewcha.app/) client for local network
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

##### 1.5 Top up your balance with a faucet
- Copy .env.example to .env
- Replace YOUR_PUBLIC_KEY_HERE and YOUR_PRIVATE_KEY_HERE with your real public key and private key.


## 2. Compile project using docker

```bash
yarn compile
```

## 3. Deploy smart using TypeScript

Before the deployment you need to top-up your account. 

The account public key will be taken from .env file(please see .env.example).

```bash
yarn faucet
```


```bash
yarn deploy
```

You can't deploy to the same network a second time becase the account address has the contract.


You can clean the locla network by running
```bash
yarn clean_local_network
```

```bash
yarn run_local_network
```


```bash
yarn faucet
```


```bash
yarn deploy
```


## 4. Test smart using TypeScript
***

```bash
yarn test
```

# Get private staking key from docker validator container

Need to exec in container aptoslabs/faucet:devnet

```bash
docker exec -it 3329af36670d bash
cat ./opt/aptos/var/0/validator-identity.yaml
```
