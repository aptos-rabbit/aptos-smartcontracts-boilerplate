const ENO_MESSAGE: u64 = 0;

public fun get_message(addr: address): string::String acquires MessageHolder {
    assert!(exists<MessageHolder>(addr), Errors::not_published(ENO_MESSAGE));
    *&borrow_global<MessageHolder>(addr).message
}

#[test(account = @0x1)]
public(script) fun sender_can_set_message(account: signer) acquires MessageHolder {
    let addr = Signer::address_of(&account);
    set_message(account,  b"Hello, Blockchain");

    assert!(
        get_message(addr) == string::utf8(b"Hello, Blockchain"),
        0
    );
}