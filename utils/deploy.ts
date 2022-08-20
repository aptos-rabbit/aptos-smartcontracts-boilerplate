import { publisherAccount } from "../config";
import { compile, getNamedParametersFromToml } from "../libs/compile";
import { publishModuleFromFile } from "../libs/deploy";

async function main() {
    const addresses = await getNamedParametersFromToml();
    const compileRes = await compile(addresses);
    console.log(compileRes);
    for(const moduleName in compileRes.ByteCodeModulePaths) {
        const modulePath = compileRes.ByteCodeModulePaths[moduleName];
        const transaction = await publishModuleFromFile(publisherAccount, modulePath);

        if(transaction) {
            if(transaction.success) {
                console.log(`Module ${moduleName} was deployed; tx hash: ${transaction.hash}`);
            } else {
                console.log(`Module ${moduleName} wasn't deployed; tx hash: ${transaction.hash}`);
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