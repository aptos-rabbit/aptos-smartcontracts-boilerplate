FROM ubuntu:20.04
# RUN apt-get update
RUN apt-get update -y
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata
RUN apt-get install build-essential -y
RUN apt-get install pkg-config openssl libssl-dev libclang-dev -y
RUN apt-get install curl -y

RUN apt-get install -y wget
RUN mkdir -m777 /opt/rust /opt/cargo
ENV RUSTUP_HOME=/opt/rust CARGO_HOME=/opt/cargo PATH=/opt/cargo/bin:$PATH
RUN wget --https-only --secure-protocol=TLSv1_2 -O- https://sh.rustup.rs | sh /dev/stdin -y
RUN rustup target add x86_64-unknown-freebsd
RUN printf '#!/bin/sh\nexport CARGO_HOME=/opt/cargo\nexec /bin/sh "$@"\n' >/usr/local/bin/sh
RUN chmod +x /usr/local/bin/sh

RUN cargo install --git https://github.com/aptos-labs/aptos-core.git aptos --branch devnet

RUN apt-get install git -y
RUN mkdir /sdk
RUN cd /sdk & git clone https://github.com/aptos-labs/aptos-core.git