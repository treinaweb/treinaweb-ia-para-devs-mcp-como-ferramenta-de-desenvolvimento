# ViaCEP MCP Server

This is a Model Context Protocol (MCP) server that interacts with the ViaCEP API to retrieve address information based on Brazilian postal codes (CEP).

## Features

- Provides a `get_address_info` tool to retrieve address details by CEP
- Supports both stdio and streamable HTTP transports
- Written in JavaScript using the MCP TypeScript SDK

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Usage

### Run with stdio transport

```bash
npm run start:stdio
```

### Run with HTTP transport

```bash
npm run start:http
```

By default, the HTTP server starts on port 3000. You can change this by setting the `PORT` environment variable.

## Tool: get_address_info

This tool fetches address information from the ViaCEP API.

### Parameters

- `cep`: String - Brazilian postal code in format "00000-000" or "00000000"

### Response

Returns an object containing the following address information:

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

### Error Handling

- Returns an error if the CEP format is invalid
- Returns an error if the CEP is not found
- Returns an error if the API is unavailable

## Example Usage

Using an MCP client:

```javascript
// Call the tool
const result = await client.callTool({
  name: "get_address_info",
  arguments: {
    cep: "01001-000"
  }
});
```

## License

ISC
