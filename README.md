# YelloStone-gRPC-Solana-Indexer

A modular and extensible blockchain indexer for Solana, connecting to the Yellowstone gRPC stream. This project allows you to subscribe in real-time to account, slot, transaction, and block updates, and is designed for easy customization to different token sets or data streams.

---

## What does this project do?

This project listens to the Yellowstone gRPC stream for the Solana blockchain and indexes specific blockchain data in real-time. It can:

- Subscribe to updates for accounts (e.g., USDC, USDT, Wrapped SOL) and token programs.
- Track slot changes, transaction statuses, and block updates.
- Store relevant data into a database using Prisma ORM (see `src/processing/dataHandler.ts`).
- Print color-coded and human-readable logs to the console for each type of update, making development and debugging easier.

The system is modular: you can easily switch between various subscription types (main, account-only, or token program) by changing one line in `src/index.ts`.

---

## How does it work?

1. **gRPC Client Connection**  
   The indexer connects to Yellowstone's gRPC endpoint, subscribes to different Solana data streams (accounts, slots, transactions, blocks), and processes incoming data.

2. **Subscription Types** (configured in `src/index.ts`)
    - **Main Subscription (`createSubscribeRequest`)**:  
      Subscribes to USDC and USDT account updates, slot updates, transaction and block updates for these mints.
    - **Account-Only Subscription (`createAccountOnlySubscription`)**:  
      Subscribes only to USDC, USDT, and Wrapped SOL account updates.
    - **Token Program Subscription (`createTokenProgramSubscription`)**:  
      Subscribes to all accounts owned by the Token Program, filtered by data size.

   To change the subscription, comment/uncomment the relevant line in `src/index.ts`.

3. **Data Processing**  
   All incoming data is handled in `src/processing/dataHandler.ts`, which:
    - Persists account, transaction, slot, and block updates to the database (via Prisma).
    - Optionally logs these updates to the console in a color-coded format using `chalk`.

4. **Database Integration**  
   The project uses Prisma ORM (`@prisma/client`) for data storage. Make sure your database is configured (see additional Prisma docs if needed).

---

## Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/raunit-dev/YelloStone-gRPC-Solana-indexer.git
    cd YelloStone-gRPC-Solana-indexer
    ```

2. **Configure Environment Variables**  
   Create a `.env` file in the root directory:
    ```
    ENDPOINT=your_grpc_endpoint
    TOKEN=your_api_token
    ```
   Replace with your actual Yellowstone gRPC endpoint and API token.

3. **Install Dependencies**
    ```bash
    npm install
    ```

4. **Setup Prisma (Optional, for database)**
    - Configure your database connection in `prisma/schema.prisma` and `.env`.
    - Run migrations:
      ```bash
      npx prisma migrate deploy
      ```

5. **Run the Application**
    ```bash
    npm run dev
    ```

---

## Customization

- **Switch subscription types**:  
  Edit `src/index.ts` and comment/uncomment the needed subscription line.
- **Change tokens/accounts tracked**:  
  Edit the account lists in `src/grpc/requestMain.ts`, `src/grpc/requestAcc.ts`, or `src/grpc/requestToken.ts`.
- **Modify data handling or storage**:  
  Edit the logic in `src/processing/dataHandler.ts` to adjust how/what data is logged or stored.

---

## Data Handling

- **Account Updates**: Tracks public key, owner, lamports, and more.
- **Transaction Updates**: Logs signature, slot, and success status.
- **Slot Updates**: Logs slot number and parent slot.
- **Block Updates**: Logs blockhash, height, time, parent slot, and various counts.

All updates are processed by `src/processing/dataHandler.ts` and stored using Prisma.

---

## Requirements

- Node.js (18+ recommended)
- npm
- Access to a Yellowstone Solana gRPC endpoint and API token
- (Optional) Database supported by Prisma (PostgreSQL, MySQL, SQLite, etc.)

---

## License

MIT (add license file as needed)

---

## Author

Maintained by [@raunit-dev](https://github.com/raunit-dev)
