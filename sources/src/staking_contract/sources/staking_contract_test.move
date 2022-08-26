#[test_only]
module StakingContractAddress::StakingContractTests {
    use std::signer;
    use std::unit_test;
    use std::vector;
    use std::string;

    use StakingContractAddress::StakingContract;

    fun get_account(): signer {
        vector::pop_back(&mut unit_test::create_signers_for_testing(1))
    }

    #[test]
    public entry fun sender_can_set_message() {
        let account = get_account();
        let addr = signer::address_of(&account);
        StakingContract::set_message(account,  b"Hello, Blockchain");

        assert!(
          StakingContract::get_message(addr) == string::utf8(b"Hello, Blockchain"),
          0
        );
    }
}
