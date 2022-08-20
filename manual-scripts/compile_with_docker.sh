git submodule init
git submodule update
docker run --rm -v $(pwd)/.:/src dappsdevs/aptos-cli:0.2.5 aptos move compile --package-dir /src --named-addresses HelloBlockchain=$1 --output-dir /src
