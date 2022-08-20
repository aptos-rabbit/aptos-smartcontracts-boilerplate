import { Transaction } from "aptos/dist/generated/models/Transaction";
import { Transaction_UserTransaction } from "aptos/dist/generated/models/Transaction_UserTransaction";
import { faucetClient, publisherAccount } from "../config";
import { compile, getNamedParametersFromToml } from "../libs/compile";
import { publishModuleFromFile } from "../libs/deploy";

async function main() {
    const addresses = await getNamedParametersFromToml();
    const compileRes = await compile(addresses);
    console.log(compileRes);
    for(const moduleName in compileRes.ByteCodeModulePaths) {
        const modulePath = compileRes.ByteCodeModulePaths[moduleName];
        const deployHash = await publishModuleFromFile(publisherAccount, modulePath);
        const transaction = await faucetClient.getTransactionByHash(deployHash) as Transaction_UserTransaction;

        if(transaction) {
            if(transaction.success) {
                console.log(`Module ${moduleName} was deployed; tx hash: ${deployHash}`);
            } else {
                console.log(`Module ${moduleName} wasn't deployed; tx hash: ${deployHash}`);
                console.log(transaction.vm_status);
            }
            console.log(`https://explorer.devnet.aptos.dev/txn/${transaction.version}`);
        }
        
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })