# Blockchain Indexer

This project is a blockchain indexer that connects to a Yellowstone gRPC stream to subscribe to real-time blockchain data.

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

## Current Status

As of today's work, the project is set up to connect to the Yellowstone gRPC stream. Currently, only transaction updates are being logged to the console. Further work is needed to process and display other types of blockchain data (accounts, slots, etc.) and to refine the subscription filters.
