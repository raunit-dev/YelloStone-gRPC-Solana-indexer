# Blockchain Indexer

This project is a blockchain indexer that connects to a Yellowstone gRPC stream to subscribe to real-time blockchain data. It's designed to be modular, allowing you to easily subscribe to different types of data streams.

## Setup

1.  **Environment Variables**: Create a `.env` file in the root directory with the following variables:
    ```
    ENDPOINT=your_grpc_endpoint
    TOKEN=your_api_token
    ```
    Replace `your_grpc_endpoint` and `your_api_token` with your actual Yellowstone gRPC endpoint and API token.

2.  **Install Dependencies**: Run the following command to install the project dependencies:
    ```bash
    npm install
    ```

3.  **Run the Application**: To build and run the application, use the development script:
    ```bash
    npm run dev
    ```

## Subscription Types

The indexer supports several subscription types, which can be configured in `src/index.ts`:

*   **Main Subscription (`createSubscribeRequest`)**: This is the default subscription, which includes:
    *   Account updates for specific mints (USDC and USDT).
    *   Slot updates.
    *   Transaction updates for the specified mints.
    *   Block updates for the specified mints.
*   **Account-Only Subscription (`createAccountOnlySubscription`)**: This subscription focuses solely on account updates for a predefined list of tokens (USDC, USDT, and Wrapped SOL).
*   **Token Program Subscription (`createTokenProgramSubscription`)**: This subscription is for monitoring accounts owned by the Token Program, filtered by a specific data size.

To switch between subscription types, comment or uncomment the relevant lines in `src/index.ts`.

## Data Handling

The `src/processing/dataHandler.ts` file is responsible for processing the data received from the gRPC stream. It currently logs the following information to the console:

*   **Account Updates**: Public key, owner, lamports, and other account details.
*   **Transaction Updates**: Signature, slot, and success status.
*   **Slot Updates**: Slot number and parent slot.
*   **Block Updates**: Blockhash, block height, and other block-level information.

The output is color-coded for readability using the `chalk` library.