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
        
        for(const folder of folders) {
            var projectFolder = path.join(srcFolder, folder);
            console.log(projectFolder);
            const addresses = await getNamedParametersFromToml(projectFolder);
            const compileRes = await compile(projectFolder, addresses, folder);
            console.log(compileRes);
        }
        // folders.forEach(async function (file, index) {
        //     // Make one pass and make the file complete
            
        // });
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
