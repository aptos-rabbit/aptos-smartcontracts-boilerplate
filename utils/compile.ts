import { compile, getNamedParametersFromToml } from "../libs/compile";
import {promises as fs} from 'fs';
import path from 'path';

async function main() {
    console.log('compile started');
    var srcFolder = "./sources/src";

    // Loop through all the files in the temp directory

    try{
        const folders = await fs.readdir(srcFolder);
        console.log('projects count = ' + folders.length);
        folders.forEach(async function (file, index) {
            // Make one pass and make the file complete
            var projectFolder = path.join(srcFolder, file);
            console.log(projectFolder);
            //const addresses = await getNamedParametersFromToml();
            //const compileRes = await compile(addresses);
            //console.log(compileRes);
        });
    }
    catch(err){
        console.error("Could not list the directory.", err);
            process.exit(1);
    }


    console.log('compile finished');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
