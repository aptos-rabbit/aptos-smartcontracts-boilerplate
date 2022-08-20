export interface CompileResult {
    Result: string[];
    ByteCodeModulePaths: {[contractName: string]: string }
}