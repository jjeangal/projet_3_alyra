# Voting System DAPP
## Project 3

https://github.com/jjeangal/projet_3_alyra
This project is a react based Decentralized Application answering the challenges given by Alyra in the project n°3. It was deployed on the Ropsten testnet at https://jjeangal.github.io/projet_3_alyra/ and the address of the deployed contract is 0xfa501ec0fdcE4D4e140B6A103f988A1511a8Dd57.

## Video Presentations

Workflow presentation: https://www.loom.com/share/ee9bb49b6e594d8cbc9dc3a2f0fd153a
Code presentation: https://www.loom.com/share/617c7d0697f4459cb9213466e458fb43

# React Component Architecture

Below shows an organization of the components of the DAPP with a little explanation on its functionalities and use: 

- App: The main component where all other components are called.
    - Header: Shows the current metamask address connected.
    - Intro: Shows the intro title of the voting session.
    - Status: Shows the current status of the voting session.
    - OwnerSection: Section only shown to the owner of the voting session.
        - StatusChange: Outputs the appropriate button to go to next session status. 
        - AddVoter: Outputs the add voter function if status is "Registering Voters"
    - ProposalsList: Shows the list of proposal if not empty.
    - VoterSection: Section only shown to the registered voters.
        - Proposals: This component contains both functions to get and add a proposal.
        - Vote: This component contains the both function to get a voter and to vote.
    - VoterAddresses: Shows the list of currently registered voter addresses.


## Smart Contract Optimization and Practices

Compared to project 2, Natspec has been added to the Voting.sol contract and names of declarations have been ajusted to follow the good practices, such as naming conventions.

The one possible target for attacks in the Voting.sol contract is the for loop line 156. Indeed it is a possible source of DOS attacks and different calculations have been made to secure and optimize it in terms of gas consumption. For this, we needed to calculate how many proposals inside the proposals array would cause the looping the exceed the block gas limit of 30 000 000. Below are few calculations showing the amount of gas used according to the number of proposals in the array:

| Proposals | Gas |
| ------ | ------ |
| 0 | 40 190 |
| 1 | 43 529 |
| 2 | 46 869 |
| 3 | 50 208 |
| 4 | 53 548 |

This corresponds more or less to 3340 units of gas per proposal added so the max amount of proposals allowed until reaching that limit is equals to: (30 000 000 - 40 190) / 3340 = 8 982.00299 which rounds down to 8982 to avoid the limit.

Thus, I tried using a uint16 insted of uint256 to optimize because 2^16 = 65536 > 8970 & 2^8 = 256 < 8970 and did the same calculations as above to compare. The results are exposed below:

| Proposals | Gas |
| ------ | ------ |
| 0 | 35 805 |
| 1 | 39 172 |
| 2 | 42 539 |
| 3 | 45 906 |
| 4 | 49 273 |

This corresponds more or less to 3367 units of gas per proposal added so the max amount of proposals allowed until reaching that limit is equals to: (30 000 000 - 35 805) / 3367 = 8 899.37481 which rounds down to 8 899 to avoid the limit. However, this limit is lower and doesn't allow for better optimization so I decided to keep using uint256.

## Plugins, Frameworks, Packages

In order to run the project, you need to install the following plugins.
The official npm pages are linked below.

| Plugin | Links |
| ------ | ------ |
| eth-gas-reporter | https://www.npmjs.com/package/eth-gas-reporter |
| soidity-coverage | https://www.npmjs.com/package/solidity-coverage |
| truffle/hdwallet-provider | https://www.npmjs.com/package/@truffle/hdwallet-provider |
| mocha | https://www.npmjs.com/package/mocha |
| chai | https://www.npmjs.com/package/ch |

# Tests
## Coverage

The tests are verified in terms of gas consumption, time of execution and most importantly, in terms of coverage:

File         |  % Stmts | % Branch |  % Funcs |  % Lines |
-------------|----------|----------|----------|----------|
  Voting.sol |      100 |   93.33  |      100 |      100 |

## Run the tests

Ran the tests with the following parameters

> truffle:           v5.5.17
> ganache-core:      v2.13.2
> solidity-coverage: v0.7.16

Now, open your Terminal and run these commands.

First Tab:

```sh
ganache
```

Second Tab:

```sh
truffle test test/voting.test.js
```

(optional) Third:

```sh
truffle run coverage
```

# FAQ
## How do I use this with Ganache (or any other network)?

The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out our documentation on adding network configurations. From there, you can run truffle migrate pointed to another network, restart the React dev server, and see the change take place.

## Where can I find more resources?

This Box is a sweet combo of Truffle and Create React App. Either one would be a great place to start!
