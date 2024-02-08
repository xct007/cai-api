# Character AI API

This is a simple API for a character AI. It is written in node.js and uses express.js for the server. The API provides endpoints for searching for characters, getting information about a character, and sending messages to a character AI.

The API use playwright to interact with the character AI service. It sends requests to the character AI service and returns the responses to the client.

The API is also documented using Swagger, so you can easily see the available endpoints and test them using the Swagger UI.

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
  - [Testing](#testing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Prerequisites

To run the API, you will need the following:

- Node.js
- npm
- An access token for the character AI API (you can get this from the character AI service)

## Installation

1. Clone the repository
2. Run `npm install` in the root directory to install the dependencies
3. Create a `.env` file in the root directory with the following content:

```env
ACCESS_TOKEN=your_access_token
PORT=8080
```

This will set the port for the server to 8080. You can change this to any port you want.

## Running the API

To run the API, run `npm start` in the root directory. The API will be available at `localhost:8080`.

Note: requires to install playwright dependencies. Run `npx playwright install` to install the dependencies.

## API Endpoints

Swagger documentation is available at `http://localhost:8080/docs` after running the API.

The API provides the following endpoints:

### `GET /api/search_character`

Returns a list of characters that match the search query. The search query should be sent as a `query` parameter in the URL.

```curl
curl -X GET \
  'http://localhost:8080/api/search_character?query=yor' \
  -H 'Content-Type: application/json'
```

Response:

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

### `GET /api/character_info`

Returns a list of all characters with their information. The character's external ID should be sent as a `external_id` parameter in the URL.

```curl
curl -X GET \
  'http://localhost:8080/api/character_info?external_id=11' \
  -H 'accept: application/json'
```

Response:

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

### `POST /api/send_message`

Sends a message to the character AI. The message should be sent in the body of the request as a JSON object with the following format:

```json
{
	"external_id": "1234",
	"message": "Hello, world!"
}
```

The `external_id` is a unique identifier for the user sending the message. The `message` is the message to be sent to the character AI.

```curl
curl -X POST \
  http://localhost:8080/api/send_message \
  -H 'Content-Type: application/json' \
  -d '{
    "external_id": "1234",
    "message": "Hello, world!"
}'
```

Response:

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

## Testing

No tests have been written for this project. However, you can test the API using the provided endpoints. You can use a tool like Postman to send requests to the API and check the responses.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was created as part of a technical interview process. Thank you for the opportunity to work on this project.

In the future, I would like to add more features to the API, such as user authentication and authorization, and more endpoints for interacting with the character AI service.

If you have any questions or feedback, please feel free to reach out to me. I would love to hear from you!
