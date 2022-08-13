# https://github.com/aptos-labs/aptos-core/blob/main/docker/compose/validator-testnet/docker-compose.yaml
cd localenv
export VALIDATOR_IMAGE_REPO="aptoslabs/validator"
export IMAGE_TAG="devnet"
docker-compose up