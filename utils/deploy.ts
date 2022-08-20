import { publisherAccount } from "../config";
import { compile, getNamedParametersFromToml } from "../libs/compile";
import { publishModuleFromFile } from "../libs/deploy";

async function main() {
    const addresses = await getNamedParametersFromToml();
    const compileRes = await compile(addresses);
    console.log(compileRes);
    for(const moduleName in compileRes.ByteCodeModulePaths) {
        const modulePath = compileRes.ByteCodeModulePaths[moduleName];
        const deployHash = await publishModuleFromFile(publisherAccount, modulePath);
        console.log(`Module ${moduleName} was deployed; deploy hash: ${deployHash}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })