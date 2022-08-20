import { compile, getNamedParametersFromToml } from "../libs/compile";

async function main() {
    const addresses = await getNamedParametersFromToml();
    const compileRes = await compile(addresses);
    console.log(compileRes);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })