module HelloBlockchain::Message {
    use std::string;
    use std::error;
    use std::signer;

    struct MessageHolder has key {
        message: string::String,
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