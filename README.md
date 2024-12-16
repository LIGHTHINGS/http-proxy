# Proxy Server Application

This application is a **proxy server** designed to forward API requests to a backend service while abstracting the routing logic. The proxy server intercepts and processes subroutes before forwarding them to the appropriate backend endpoints. This README will guide you through setting up and running the application, including environment configuration and API usage.

---

## Features

1. **Proxy Functionality**: Automatically handles API subroutes and forwards them to the backend service.
2. **Environment Configuration**: Customize the behavior using a `.env` file.
3. **Simplified API Calls**: Use a single entry point for all API requests, while the proxy server determines the actual backend destination.

---

## Prerequisites

1. **Node.js** (v14 or higher) installed on your machine.
2. A `.env` file containing the required configuration.
3. The `Origin` slug provided during onboarding.

---

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Configuration

### Create a `.env` File

The proxy server requires a `.env` file in the root directory for configuration. Create a `.env` file and include the following variable:

```env
ORIGIN=<your-origin-slug>
```

- Replace `<your-origin-slug>` with the slug provided by the backend after the onboarding process.

---

## Usage

### Starting the Server

Run the proxy server with:
```bash
npm start
```

By default, the proxy server will start on `http://localhost:3001`.

### Making API Calls

To interact with the backend through the proxy server, make API calls to:
```
http://localhost:3001/api/<subroute>
```

#### Key Points:
1. Replace `<subroute>` with the desired backend subroute.
2. The proxy server will forward requests dynamically to the backend service based on the subroute.
3. Example:
   - If the backend endpoint for fetching users is `/users`, make the request to:
     ```
     http://localhost:3001/api/users
     ```
   - The proxy server will handle forwarding the request to the actual backend endpoint.

### Error Handling

Ensure the following to avoid common issues:
- The `.env` file exists and contains the correct `ORIGIN` value.
- The backend service is reachable and configured to accept requests from the proxy server.

---

## Contributing

Feel free to open issues or contribute to this project via pull requests.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

