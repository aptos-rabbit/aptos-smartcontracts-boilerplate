// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

use aptos_types::account_address::AccountAddress;
use aptos_vm::natives::aptos_natives;
use move_deps::move_cli::base::test::run_move_unit_tests;
use move_deps::move_unit_test::UnitTestingConfig;
use std::{collections::BTreeMap, path::PathBuf};
use tempfile::tempdir;

pub fn path_in_crate<S>(relative: S) -> PathBuf
where
    S: Into<String>,
{
    let mut path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    path.push("src");
    path.push(relative.into());
    path
}

pub fn run_tests_for_pkg(
    path_to_pkg: impl Into<String>,
    named_addr: BTreeMap<String, AccountAddress>,
) {
    let pkg_path = path_in_crate(path_to_pkg);
    println!("{}", pkg_path.as_path().to_str().unwrap());
    run_move_unit_tests(
        &pkg_path,
        move_deps::move_package::BuildConfig {
            test_mode: true,
            install_dir: Some(tempdir().unwrap().path().to_path_buf()),
            additional_named_addresses: named_addr,
            ..Default::default()
        },
        UnitTestingConfig::default_with_bound(Some(100_000)),
        // TODO(Gas): we may want to switch to non-zero costs in the future
        aptos_natives(aptos_gas::NativeGasParameters::zeros()),
        /* compute_coverage */ false,
        &mut std::io::stdout(),
    )
    .unwrap();
}

#[test]
fn test_message() {
    let named_address = BTreeMap::from([(
        String::from("MessageAddress"),
        AccountAddress::from_hex_literal("0x1").unwrap(),
    )]);
    run_tests_for_pkg("message", named_address);
}

#[test]
fn test_staking_contract() {
    let named_address = BTreeMap::from([(
        String::from("StakingContractAddress"),
        AccountAddress::from_hex_literal("0x1").unwrap(),
    )]);
    run_tests_for_pkg("staking_contract", named_address);
}
