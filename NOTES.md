## User Flows

Note that:

- primary login and authentication mechanism of the app is web3 login
- if we have a wallet connected only then twitter verification can be done

---

Verification Flow:

1. three step process - only web3 login is persistent
2. connect a web3 wallet
3. (only visible if wallet is connected) verify twitter - not persistent [do we want to store twitter auth with web3 address in the database?]
4. sign a message
5. generate identity locally in the browser in the background

---
