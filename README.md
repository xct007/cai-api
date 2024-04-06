## Note

> We've migrated from Express.js to Fastify for improved performance and efficiency. This change won't affect the API's functionality. Please report any issues you encounter.

# Character AI API

This is a simple API for a character AI. The API provides endpoints for searching for characters, getting information about a character, and sending messages to a character AI.

## Table of Contents

- [Character AI API](#character-ai-api)
	- [Table of Contents](#table-of-contents)
	- [Prerequisites](#prerequisites)
	- [Installation](#installation)
	- [Running the API](#running-the-api)
	- [API Endpoints](#api-endpoints)
		- [`GET /api/search_character`](#get-apisearch_character)
		- [`GET /api/character_info`](#get-apicharacter_info)
		- [`POST /api/send_message`](#post-apisend_message)
	- [Test](#test)
	- [License](#license)
	- [Acknowledgments](#acknowledgments)
	- [Live Demo](#live-demo)

## Prerequisites

To run the API, you will need the following:

- Node.js
  - This project was built using Node.js version 20.0.0. You can check your version of Node.js by running `node -v` in your terminal.
- npm (Node Package Manager)
  - You can install these by following the instructions on the [Node.js website](https://nodejs.org/).
- An access token for the character AI API
  - You can get this from the character AI service.

## Installation

1. Clone the repository
2. Run `npm install` in the root directory to install the dependencies
   1. requires to install `@xct007/chrt-ai`
3. Create a `.env` file in the root directory with the following content or rename the `.env.example` file to `.env` and fill in the values:

   ```env
   ACCESS_TOKEN=your_access_token
   ID_TOKEN=your_id_token
   PORT=8080
   ```

   - `ACCESS_TOKEN`: This is the access token for the character AI service.
   - `ID_TOKEN`: This is the id token for the character AI service.
   - `PORT`: This will set the port for the server to `8080`. You can change this to any port you want. `default` is `3000` if not set.

Note: requires to install playwright dependencies. Run `npx playwright install` to install the dependencies.

## Running the API

To run the API, run `npm start` in the root directory. The API will be available at `localhost:PORT`.

## API Endpoints

Swagger documentation is available at `/docs` after running the API.

The API provides the following endpoints:

### `GET /api/search_character`

Returns a list of characters that match the search query. The search query should be sent as a `query` parameter in the URL.

```bash
curl -X GET \
  'http://localhost:8080/api/search_character?query=yor' \
  -H 'Content-Type: application/json'
```

<details> 
	<summary> Response </summary>

```json
{
	"status": true,
	"result": [
		{
			"status": false,
			"result": {
				"characters": [
					{
						"document_id": "3b1cb305-d8df-4fe7-80cf-b5de87e6d112",
						"external_id": "WsqG34NBsbCr3hxN7gJA_y5khYtVQzTD71IqdtfO57Y",
						"title": "A loving mom who's definitely not an assassin",
						"greeting": "Hi, I'm a loving mom who's definitely not an assassin.",
						"avatar_file_name": "uploaded/2022/11/28/aHHgTYRLA59ZMpLVfaRee_90iW42A_CeTvkkFlS3rOU.webp",
						"visibility": "PUBLIC",
						"participant__name": "Yor Forger",
						"participant__num_interactions": 58786141,
						"user__username": "CreativeUsername352",
						"priority": 0,
						"search_score": 71.66664
					}
				],
				"request_id": "t3q79PEARkuwthB_EddJsQ"
			}
		}
	]
}
```

</details>

### `GET /api/character_info`

Returns a list of all characters with their information. The character's external ID should be sent as a `external_id` parameter in the URL.

```bash
curl -X GET \
  'http://localhost:PORT/api/character_info?external_id=11' \
  -H 'accept: application/json'
```

<details> 
	<summary> Response </summary>

```json
{
	"status": true,
	"result": {
		"character": {
			"external_id": "WsqG34NBsbCr3hxN7gJA_y5khYtVQzTD71IqdtfO57Y",
			"title": "A loving mom who's definitely not an assassin",
			"name": "Yor Forger",
			"visibility": "PUBLIC",
			"greeting": "Hi, I'm a loving mom who's definitely not an assassin.",
			"avatar_file_name": "uploaded/2022/11/28/aHHgTYRLA59ZMpLVfaRee_90iW42A_CeTvkkFlS3rOU.webp"
		},
		"status": "OK"
	}
}
```

</details>

### `POST /api/send_message`

Sends a message to the character AI. The message should be sent in the body of the request as a JSON object with the following format:

```json
{
	"external_id": "1234",
	"message": "Hello, world!"
}
```

The `external_id` is a unique identifier for the user sending the message. The `message` is the message to be sent to the character AI.

```bash
curl -X POST \
  http://localhost:PORT/api/send_message \
  -H 'Content-Type: application/json' \
  -d '{
    "external_id": "1234",
    "message": "Hello, world!"
}'
```

<details> 
	<summary> Response </summary>

```json
{
	"status": true,
	"result": {
		"replies": [
			{
				"text": "this is a reply",
				"uuid": "string",
				"id": 1
			}
		],
		"src_char": {
			"participant": {
				"name": "string"
			},
			"avatar_file_name": "string"
		},
		"is_final_chunk": true,
		"last_user_msg_id": 0,
		"last_user_msg_uuid": "xxx"
	}
}
```

</details>

## Test

To run the tests, run `npm test` in the root directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was created as part of a technical interview process. Thank you for the opportunity to work on this project.

The API is Reverse-Engineered from the character AI service. Do not hope many features are available in this API.

If you have any questions or feedback, please feel free to reach out to me. I would love to hear from you!

## Live Demo

A live demo of the API is available at [https://apigratis.site/docs](https://apigratis.site/docs)
