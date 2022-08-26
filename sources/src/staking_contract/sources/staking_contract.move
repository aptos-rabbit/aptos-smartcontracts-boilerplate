module StakingContractAddress::StakingContract {
    use std::string;
    use std::error;
    use std::signer;

    struct MessageHolder has key {
        message: string::String,
    }

    /// There is no message present
    const ENO_MESSAGE: u64 = 0;

    public fun get_message(addr: address): string::String acquires MessageHolder {
        assert!(exists<MessageHolder>(addr), error::not_found(ENO_MESSAGE));
        *&borrow_global<MessageHolder>(addr).message
    }

    public entry fun set_message(account: signer, message_bytes: vector<u8>)
    acquires MessageHolder {
        let message = string::utf8(message_bytes);
        let account_addr = signer::address_of(&account);
        if (!exists<MessageHolder>(account_addr)) {
            move_to(&account, MessageHolder {
                message,
            })
        } else {
            let old_message_holder = borrow_global_mut<MessageHolder>(account_addr);
            old_message_holder.message = message;
        }
    }
}