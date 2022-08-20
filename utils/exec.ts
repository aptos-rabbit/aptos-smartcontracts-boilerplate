/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
 const { exec } = require('child_process')

//  export function execShellCommand(cmd: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//       exec(cmd, (error: any, stdout: any, stderr: any) => {
//         if (error) return reject(error + '')
//         if (stderr) return reject(stderr + '')
//         resolve(stdout + '')
//       })
//     })
//   }

export function execShellCommand(cmd: string): Promise<any> {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, function(
            error: any,
            stdout: any,
            stderr: any
        ) {
            console.log('Running Athena...');
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
                // Reject if there is an error:
                return reject(error);
            }
    
            // Otherwise resolve the promise:
            resolve(stdout? stdout : "");
        });
    });
}