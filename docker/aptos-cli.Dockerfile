FROM ubuntu:20.04
# RUN apt-get update
RUN apt-get update
RUN apt-get install build-essential
RUN apt-get install pkg-config openssl libssl-dev libclang-dev
RUN cargo install --git https://github.com/aptos-labs/aptos-core.git aptos --branch devnet