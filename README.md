# Aptos Boilerplate

This is a Boilerplate project for dapps development on Aptos network.

## Contents

[Prerequisites](#prerequisites)

[1. Start local network](#1-start-local-network)

&nbsp;&nbsp;&nbsp;&nbsp;[1.1 Clone the project](#11-clone-the-project)

&nbsp;&nbsp;&nbsp;&nbsp;[1.2 Install dependencies](#12-install-dependencies)

&nbsp;&nbsp;&nbsp;&nbsp;[1.3 Create .env file](#13-create-env-file)

&nbsp;&nbsp;&nbsp;&nbsp;[1.4 run local network](#14-run-local-network)

&nbsp;&nbsp;&nbsp;&nbsp;[1.5 Use Aptos Fewcha client for local network](#15-use-aptos-fewcha-client-for-local-network)

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

##### 1.3 Create .env file
```bash
cp .env.example .env
```

##### 1.4 run local network
Using Docker (recommended):
```bash
yarn run_local_network
```

Using Aptos CLI:
```bash
yarn run_local_network_with_cli
```

##### 1.5 Use Aptos Fewcha client for local network
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

##### 1.6 Top up your balance with a faucet
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
