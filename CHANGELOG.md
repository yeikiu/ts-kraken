# ts-kraken

> All major changes will be added to this file top-to-bottom

- ### v3.0.15

    - #### chore:
        - fix: actions workflows

- ### v3.0.14

    - #### chore:
        - 🏁 Updated libs:

            axios ^0.25.0 --> ^0.26.1
            dotenv ^14.3.0 --> ^16.0.0
            rxjs ^7.5.2 --> ^7.5.5
            ws ^8.4.2 --> ^8.5.0

        - 🏁 Updated DEV-libs:

            @types/node ^17.0.12 --> ^17.0.21
            @typescript-eslint/eslint-plugin ^5.10.1 --> ^5.15.0
            @typescript-eslint/parser ^5.10.1 --> ^5.15.0
            ts-node ^10.4.0 --> ^10.7.0
            typescript ^4.5.5 --> ^4.6.2
            
- ### v3.0.13

    - #### chore:
        - 🏁 Updated libs:

            axios ^0.24.0 --> ^0.25.0
            dotenv ^10.0.0 --> ^14.3.0
            qs ^6.10.2 --> ^6.10.3
            rxjs ^7.4.0 --> ^7.5.2
            ws ^8.3.0 --> ^8.4.2

        - 🏁 Updated DEV-libs:

            @types/node ^17.0.0 --> ^17.0.12
            @typescript-eslint/eslint-plugin ^5.7.0 --> ^5.10.1
            @typescript-eslint/parser ^5.7.0 --> ^5.10.1
            eslint-plugin-import ^2.25.3 --> ^2.25.4
            typescript ^4.5.4 --> ^4.5.5

- ### v3.0.12

    - #### feat:
        - Added `.find` repl-cli method

- ### v3.0.11

    - #### feat:
        - Added `openOrderPartialExec` stream

    - #### chore:
        - ts-standard code-linting script

- ### v3.0.10

    - #### chore:
        - Bumped actions/setup-node in npm job

- ### v3.0.9

    - #### chore:
        - Bumped most dependencies

    - #### fix:
        - Added eslint auto-indentation

- ### v3.0.7

    - #### feat:
        - Added `watchPairPrice` helper method

- ### v3.0.6

    - #### fix:
        - Add some more assets aliases to `getPairBalances` REST helper

- ### v3.0.5

    - #### feature:
        - `getSpreadStream` and `getTradesStream` WS Helpers

- ### v3.0.4

    - #### fix:
        - rename `preinstall` npm script into `fix:audit`
        - README repl examples

- ### v3.0.0

    - #### refactor:
        - Use only modules instead of namespaces

- ### v2.0.0

    - #### feature:
        - Types for all API endpoints and WS events

    - #### refactor:
        - Project internal structure/naming

- ### v1.0.0

    - #### feature:
        - MVP version covering API, WS and a repl to interact
