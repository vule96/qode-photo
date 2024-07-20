# Qode Upload App

This is a simple image upload application built with NextJS, NestJS, Ant Design, Prisma, and PostgreSQL. It allows users to drag and drop or click to upload images.

## Technologies

- **Nx Monorepo**
- **NextJS**
- **NestJS**
- **Ant Design**
- **Prisma**
- **PostgreSQL**
- **Docker**

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/vule96/qode-photo
    cd qode-photo
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Start the Docker containers:

    ```bash
    yarn run docker:start
    ```

4. Apply database migrations:

    ```bash
    yarn run db:push:dev
    ```

5. Start the server (or build for production):

    - To start the development server:

      ```bash
      yarn run dev:server
      ```

    - To build and start in production mode:

      ```bash
      yarn run build:server
      yarn run start:server
      ```

6. Start the client (or build for production):

    - To start the development client:

      ```bash
      yarn run dev:client
      ```

    - To build and start in production mode:

      ```bash
      yarn run build:client
      yarn run start:client
      ```

    - Alternatively, you can build both client and server together:

      ```bash
      yarn run build
      ```

## Usage

After setting up the environment and starting the server and client, you can access them at:

- **Server**: `http://localhost:3000`
- **Client**: `http://localhost:4200`

Happy coding!
