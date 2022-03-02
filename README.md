
# Lengoo Backend Challenge

## Intro

Challenge proposed by Lengoo on a selection process for a back-end Developer role that consists of developing a back-end application, with the following requirements:

- Create a REST API for uploading subtitles in a plain text format (.txt) and send an email with the translation as attachment once the process done.
- Create the TMS either inside or outside the document translator (however you feel is the best way) with the two endpoints stated before.
- The task must be developed with NodeJS.
- All code as well as documentation or comments must be in English.
- The code must run. You can assume the reviewer has NodeJS and docker on their machine, but no databases or other runtimes.

First of all I would like to thank you for the opportunity to be able to take the test.

## Demonstration

  Demo Video: [https://youtu.be/zceskWPYcyw](https://youtu.be/zceskWPYcyw)

## Architecture
![Architeture](./resources/architecture.png)

## Services Management

AS you can see I'm using Mailhog to send mails, Minio to storage files, and Kue to schedule jobs in a redis. You can access all this interfaces just going trough:

**Minio** - *Visualize files.* - [[Access](http://0.0.0.0:9001), [Print](./resources/minio.png)]

**Mailhog** - *Visualize mails with processed translations.* - [[Access](http://0.0.0.0:8025), [Print](./resources/mailhog.png)]

**Kue Api** - *Visualize jobs by status.* - [[Access](http://0.0.0.0:9004/queues/api), [Print](./resources/kue.queues.png)]

**Kue Queues** - *Visualize jobs by Queues.* - [[Access](http://0.0.0.0:9004/queues), [Print](./resources/kue.api.png)]

*PS: Credentials to access minio UI are inside .env.example*

## Project Behavior

- **INFRASTRUCTURE**

  Docker was used to facilitate the environment, in this case the database(mongoDB), file storage(Minio), mail sender(Mailhog), message broker(Redis) to manage background jobs and of course the the creation of the DB, collections for later import and all init project configurations.

- **AUTHENTICATION**

  Due to the fact that the security of an API is essential, I performed the implementation of authentication with JWT being necessary in the header of each request in the Authorization field to insert the JWT token acquired from `[GET] - /api/auth`.

- **API**

  For the routes exhibition on REST model with JSON format I did use the Express micro-framework for being very lean, simple to work with and highly customizable. I could use Hapi or NestJS for example without any problem.

- **TESTS**

  To perform unitary tests I did use Jest for both (integratin and unit). For integration tests I did use Supertest.

- **BACKGROUND JOBS**
  I have 2 Jobs, the first one is the upload job, it's triggered by the `[POST] - /api/subtitles/upload` responsible for upload the subtitles file inside Minio, register data inside mongodb and schedule the seconde one JOB tho translate subtitles that runs every minute using cron jobs. As I said the second job do the translation work triggered by the first one and search inside mongoDB for the subtitle, translate and send the result by mail for the user using Mailhog.

## Primarily Used Technologies

- [Node](https://nodejs.org/en/) - 14.17.0
- [Yarn](https://yarnpkg.com/) - 1.22.17
- [Jest](https://jestjs.io/) - 27.5.1
- [Dotenv-Safe](https://www.npmjs.com/package/dotenv-safe) - 8.2.0
- [Express](https://expressjs.com/) - 4.17.2
- [Mongoose](https://mongoosejs.com/) - 5.13.7
- [Supertest](https://www.npmjs.com/package/supertest) - 6.2.2
- [Babel](https://babeljs.io/) - 7.17.0
- [Eslint](https://eslint.org/) - 8.9.0
- [Joi](https://joi.dev/) - 17.6.0
- [Kue](https://www.npmjs.com/package/kue) - 0.11.6
- [Minio](https://min.io/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Mailhog](https://github.com/mailhog/MailHog)

## Instalation

### Prerequisites

To run on docker you only need to have `docker version 20.10.5` or greather and `docker-compose version 1.29.0` or greather installed, but if you wanna to run locally, will need aditionally to have Node installed in version v12.x.x or v14.x.x.

### Phases

To run the application on your machine, follow these steps:

#### Docker

1. git clone [https://github.com/devbarba/lengoo-challenge](https://github.com/devbarba/lengoo-challenge)

2. `cd harbs-backend-coding-challenge` to access the project folder.

3. `git checkout development` to go to development branch.

4. `docker-compose up -d --build` it will run all necessary things.

#### Local


1. git clone [https://github.com/devbarba/lengoo-challenge](https://github.com/devbarba/lengoo-challenge)

2. `cd harbs-backend-coding-challenge` to access the project folder.

3. `yarn` or `npm install` to performs installation of dependencies.

4. `cp .env.example .env` to copy environment variables.

5. `yarn importData` or `npm run importData` for import the default api user.
6. `yarn build` or `npm run build` to build the application.

7. `yarn start` or `npm run start` to run the application.

*PS: `yarn dev` to run on dev mode.*

*PS: If you wanna to run local without docker, go to created `.env` file and change the value for `127.0.0.1` or `0.0.0.0`: from these envs: `MONGO_HOST, REDIS_HOST, MAILHOG_HOST and MINIO_HOST.`*

## CURL to test API


```shell
curl --request GET --url http://0.0.0.0:9004/api
```

## Tests

Code coverage: `82.05%`.

To run the integration and unit tests run the following command: `yarn test`

# End-points

  To user our endpoints you need to get logged in `[GET] - /api/auth` using credentials that you will create or just use for the first auth , credentials that are inserted on docker startup because for get all endpoints you need to be logged first, follow bellow:

  ```shell
    {
		"email": "challenge@lengoo.com",
		"pass": "123456"
    }
  ```

  Insomnia Collection: [Clique here to get the insomnia collecton](./resources/insomnia-collection.json)

### Records

| resource                  | description                       |
| :------------------------ | :-------------------------------- |
| `/api` **GET** | Health Check |

`/api` **GET** - **[200 - OK]**

**RESPONSE**
```shell
{
	"timestamp": "1645605454688",
}
```
___

| resource                  | description                       |
| :------------------------ | :-------------------------------- |
| `/api/auth` **POST** | Authtentication Route |

`/api/auth` **POST** - **[200 - OK]**

**REQUEST - Expected Payload**
```shell
{
	"email": "challenge@lengoo.com",
	"password": "123456"
}
```

**RESPONSE**
```shell
{
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDU2MDU1MzYsImV4cCI6MTY0NTY5MTkzNiwic3ViIjoiNGM2NTZlNjc2ZjZmNGM2NTZlNjc2ZjZmIn0.Doy0effpBUiHWmpsq1vhrbwV8134lUXa8HOaa5HVUR4"
	}
}
```

`/api/auth` **POST** - **[412 - PRECONDITION FAILED]**

**REQUEST - When some field are missing**
```shell
{
	"email": "challenge@lengoo.com"
}
```

**RESPONSE**
```shell
{
	"msg": "password is required"
}
```

`/api/auth` **POST** - **[401 - UNAUTHORIZED]**

**REQUEST - When passed information are incorrect or inexistent**
```shell
{
	"email": "challenge@lengoo.com",
    "password": "abcdefghij"
}
```

**RESPONSE**
```shell
{
	"msg": "incorrect email/password combination"
}
```
___

| resource                  | description                       |
| :------------------------ | :-------------------------------- |
| `/api/users` **GET** | Read registered users |
| Authorization | Bearer `token` |

`/api/auth` **GET** - **[200 - OK]**

**RESPONSE**
```shell
{
	"data": [
		{
			"_id": "4c656e676f6f4c656e676f6f",
			"name": "Lengoo",
			"email": "challenge@lengoo.com",
			"role": "Admin",
			"active": true,
			"createdAt": "2022-02-21T11:12:08.739Z",
			"updatedAt": "2022-02-21T11:12:08.739Z"
		}
	]
}
```

`/api/auth` **GET** - **[404 - NOT FOUND]**

**RESPONSE - When doesn't exist users**
```shell
{
	"msg": "no query results found"
}
```

| resource                  | description                       |
| :------------------------ | :-------------------------------- |
| `/api/users` **POST** | Create a user |
| Authorization | Bearer `token` |

`/api/auth` **POST** - **[200 - OK]**

**REQUEST**
```shell
{
	"name": "João Pedro Harbs",
	"email": "harbspj@gmail.com",
	"role": "Client",
	"password": "123456",
	"password_confirmation": "123456"
}
```

**RESPONSE**
```shell
{
	"data": {
		"_id": "6215f26a915b9e0054df2949",
		"name": "João Pedro Harbs",
		"email": "harbspj@gmail.com",
		"role": "Client",
		"active": true,
		"password": "$2a$08$D2Wt2OeDC8lIs..mB5MyiOPXpVsnergZfk64Kbc1eDvv4Ii.9/PYi",
		"createdAt": "2022-02-23T08:38:02.064Z",
		"updatedAt": "2022-02-23T08:38:02.064Z",
		"__v": 0
	}
}
```

`/api/auth` **POST** - **[409 - CONFLICT]**

**REQUEST - When user already exists**
```shell
{
	"name": "João Pedro Harbs",
	"email": "harbspj@gmail.com",
	"role": "Client",
	"password": "123456",
	"password_confirmation": "123456"
}
```

**RESPONSE**
```shell
{
	"msg": "email address already used"
}
```

`/api/auth` **POST** - **[412 - PRECONDITION FAILED]**

**REQUEST - When some field is missing**
```shell
{
	"name": "João Pedro Harbs",
	"email": "harbspj@gmail.com",
	"role": "Client",
	"password_confirmation": "123456"
}
```

**RESPONSE**
```shell
{
	"msg": "password is required"
}
```

| resource                  | description                       |
| :------------------------ | :-------------------------------- |
| `/api/users/:uuid` **DELETE** | Delete User |
| Authorization | Bearer `token` |

`/api/auth` **DELETE** - **[204 - NO CONTENT]**

**RESPONSE - Successful deletion**
```shell
```

`/api/auth` **DELETE** - **[404 - NOT FOUND]**

**RESPONSE - When user doesn't exists**
```shell
{
	"msg": "user not found"
}
```
___

| resource                  | description                       |
| :------------------------ | :-------------------------------- |
| `/api/translations` **POST** | Insert translations |
| Authorization | Bearer `token` |

`/api/auth` **DELETE** - **[200 - OK]**

**REQUEST**
```shell
[
  {
    "source": "Hello",
    "target": "Hallo",
		"sourceLanguage": "en",
		"targetLanguage": "de"
  },
  {
    "source": "Come back to the light.",
    "target": "Komm zurück zum Licht.",
		"sourceLanguage": "en",
		"targetLanguage": "de"
  },
  {
    "source": "Nooo, my precious!!.",
    "target": "Nein, my Schatz!!.",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  }
]
```

**RESPONSE**
```shell
{
	"msg": "successfully inserted translations",
	"data": [
		{
			"_id": "621533a767bff160dfa8e6a7",
			"_user": "4c656e676f6f4c656e676f6f",
			"source": "Hello",
			"sourceLanguage": "en",
			"target": "Hallo",
			"targetLanguage": "de",
			"__v": 0,
			"createdAt": "2022-02-22T19:04:07.504Z",
			"updatedAt": "2022-02-23T08:38:39.879Z"
		},
		{
			"_id": "6214cba367bff160dfa8b306",
			"_user": "4c656e676f6f4c656e676f6f",
			"source": "Come back to the light.",
			"sourceLanguage": "en",
			"target": "Komm zurück zum Licht.",
			"targetLanguage": "de",
			"__v": 0,
			"createdAt": "2022-02-22T11:40:19.292Z",
			"updatedAt": "2022-02-23T08:38:39.880Z"
		},
		{
			"_id": "6214cba367bff160dfa8b308",
			"_user": "4c656e676f6f4c656e676f6f",
			"source": "Nooo, my precious!!.",
			"sourceLanguage": "en",
			"target": "Nein, my Schatz!!.",
			"targetLanguage": "de",
			"__v": 0,
			"createdAt": "2022-02-22T11:40:19.292Z",
			"updatedAt": "2022-02-23T08:38:39.880Z"
		}
	]
}
```

`/api/auth` **DELETE** - **[412 - PRECONDITION FAILED]**

**REQUEST**
```shell
[
  {
    "target": "Hallo",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  }
]
```

**RESPONSE**
```shell
{
	"msg": "[0].source is required"
}
```
___

| resource                  | description                       |
| :------------------------ | :-------------------------------- |
| `/api/subtitles/upload` **POST** | Upload subtitles to translate |
| Authorization | Bearer `token` |
| Content-Type | multipart/form-data|

`/api/auth` **DELETE** - **[200 - OK]**

**REQUEST**
```shell
{
    "sourceLanguage": "en",
    "targetLanguage" : "de",
    "files": "file.txt here"
}
```

*PS: You can upload multiple files*

**RESPONSE**
```shell
{
	"msg": "subtitles sent to translate, you will receive in your registered email when we finish the job"
}
```

`/api/auth` **DELETE** - **[412 - PRECONDITION FAILED]**

**REQUEST - When some field is missing**
```shell
{
    "targetLanguage" : "de",
    "files": "file.txt here"
}
```

**RESPONSE**
```shell
{
	"msg": "sourceLanguage is required"
}
```

## Author

[João Harbs](https://github.com/devbarba)
