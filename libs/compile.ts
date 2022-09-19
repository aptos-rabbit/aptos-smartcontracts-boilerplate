import { faucetClient, aptosClient, PUBLIC_KEY } from "../config";
import { execShellCommand } from "./exec";
import { CompileResult } from "./models/compile_result";
import * as fs from 'fs';
import path from "path";

export async function compile(directory: string, namedAdresses: { [namedAddress: string]: string }, projectName: string): Promise<CompileResult> {
    const currentDir = process.cwd();
    const compileDir = path.join(currentDir, directory);
    const buildDir = path.join(currentDir, "build", projectName);
    let nAddrStr = "";
    for (const key in namedAdresses) {
        const value = namedAdresses[key];
        // Use `key` and `value`
        nAddrStr = nAddrStr + `${key}=${value},`
    }
    if(nAddrStr.length > 2) {
        nAddrStr = nAddrStr.slice(0, -1);
    }
    const res = await execShellCommand(`docker run --rm -v \"${compileDir}\":/src -v \"${buildDir}":/out dappsdevs/aptos-cli:0.2.5 aptos move compile --package-dir /src --named-addresses ${nAddrStr} --output-dir /out/`)
    const objRes: CompileResult = JSON.parse(res);
    const packageName = await getPackageFromToml(directory);
    objRes.ByteCodeModulePaths = {};
    for(const resIndex in objRes.Result) {
        const res = objRes.Result[resIndex];
        const moduleName = res.split("::")[1];
        objRes.ByteCodeModulePaths[moduleName] = `build/${packageName}/bytecode_modules/${moduleName}.mv`;
    }
    return objRes;
}

export async function getPackageFromToml(directory: string) : Promise<string> {
    const moveContent = fs.readFileSync(path.join(directory, 'Move.toml'),'utf8');
    const lines = moveContent.split("\n");
    
    for(let lineNumber in lines) {
        const line = lines[lineNumber];
         
        if(line.includes("name")) {
            if(line.includes("=")) {
                const parts = line.split("=");
                return parts[1].trim().replace("\"", "").replace("\"", "");
            }
        }
    }
    return "";
}
export async function getNamedParametersFromToml(directory: string) : Promise<{ [namedAddress: string]: string }> {
    const moveContent = fs.readFileSync(path.join(directory, 'Move.toml'),'utf8');
    const lines = moveContent.split("\n");
    let addresStared = false;
    let addresses: { [namedAddress: string]: string } = {};
    for(let lineNumber in lines) {
        const line = lines[lineNumber];
         
        if(line.includes("[addresses]")) {
            addresStared = true;
        }
        if(line.includes("[package]") || line.includes("[dependencies]")) {
            addresStared = false;
        }

        if(addresStared) {
            if(line.includes("=") && line.includes("\"_\"")) {
                const parts = line.split("=");
                addresses[parts[0].trim()] = PUBLIC_KEY;
            }
        }
    }

    return addresses;
}
