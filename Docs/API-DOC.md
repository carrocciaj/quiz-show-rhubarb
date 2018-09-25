# Using the Rhubarb API

Welcome to the Rhubarb API, this doc will guide you through the use of our API.

All API access is over HTTP, and accessed from https://rhubarb-quiz.herokuapp.com/api/. All data is sent and received as JSON.

## Authentication

Authencation is done through HTTP Token Authentican. Each User will be provided a token on registred. Registration route is an unauthenticated route. To access tokens you will need to login or create a user.

### To Create a User:

go to `/users` to create a user as a POST request  

The request body should be:
```json
    {
      "username": "example-username",
      "password": "password"
    }
```
The response will be:
```json
{
    "id": 00,
    "username": "example-username",
    "password_digest": "$2a$10$AKkKALZ3wUmgfFT1RcuKTOM97eiin/bSWMqVHDGVbuop..GkJYY4e",
    "api_token": "gRgmeaeDgMeo99cSfoBEW3gi",
    "admin": false,
    "created_at": "2018-09-17T19:15:40.646Z",
    "updated_at": "2018-09-17T19:15:40.646Z"
}
```

### If User exist 

  Go to `/login` to login with username and password  
  On successful login the response will be the Users's api_token  
```json
    {
      "username": "example-username",
      "api_token": "fMcBk3LqpkdYNbtTdJy1RMzJ",
      "admin": false
    }
```
## Users

  Users can take quizzes, view published quizzes and see scores for quizzes taken
### Getting Quizzes 

  Must be authenticated by using your token
  To go to your Quizzes, `GET /quizzes`   
  Response will be:  
  ```json
      [
        {
            "id": 1,
            "title": "Javascript Arrays",
            "created_at": "2018-09-23T18:20:16.754Z",
            "updated_at": "2018-09-23T18:20:16.754Z",
            "published": true
        },
        {
            "id": 2,
            "title": "Rails Models",
            "created_at": "2018-09-23T18:20:16.758Z",
            "updated_at": "2018-09-23T18:20:16.758Z",
            "published": true
        }
      ]
  ```

  To go get a quiz with questions and answers, `GET /quizzes/quiz.id`  
 

   ```json
      {
        "data": {
            "id": 2,
            "title": "Rails Models",
            "questions": [
                {
                    "id": 4,
                    "text": "Given a table `posts` and another table `comments` with the field `post_id`, which of the following associations would you use to connect the tables?",
                    "answers": [
                        {
                            "id": 12,
                            "text": "`has_and_belongs_to_many :posts` in `Comment`"
                        },
                        {
                            "id": 13,
                            "text": "`belongs_to :post, through: :post_id` in `Comment`"
                        },
                        {
                            "id": 14,
                            "text": "`has_many :comments` in `Post`"
                        },
                        {
                            "id": 15,
                            "text": "`belongs_to :comment` in `Post`"
                        }
                    ]
                }
            ]
        }
      }
   ```

### Submmitting a Quiz

Once the quiz answers have been completed to get the score submit a post request
`POST /scores`

The request should be:
```json
    {
        "quiz_id": "id of the quiz they are on",
        "answer_id": "[array of the selected answer ids]"
    }
```
The response will be:

```json
    {
        "data": {
            "quiz_id": 1,
            "quiz": "Javascript Arrays",
            "score": {
                "user_id": 1,
                "username": "test-user",
                "total_questions": 3,
                "score": 1
            }
        }
    }
```
## Admin API 

### Creating a Quiz

Go to `POST /quizzes`  
The request will be:  
```json
    { 
        "title": "Data Structures"
    }
```

The Response will be:

```json
    {
        "id": 3,
        "title": "Data Structures",
        "created_at": "2018-09-25T19:18:12.173Z",
        "updated_at": "2018-09-25T19:18:12.173Z",
        "published": false
    }
```
### Publish the Quiz

Once the Quiz and all questions and answers are created you will need to Publish the Quiz to make it available  
##### Publishing a quiz will disable future edits 
To Publish go to:
`PUT /quizzes/id`  
The request will be:

```json
    { 
        "published": true
    }
```

The response will be:

```json
    {
        "published": true,
        "id": 3,
        "title": "Data Structures",
        "created_at": "2018-09-25T19:18:12.173Z",
        "updated_at": "2018-09-25T19:26:36.229Z"
    }
```

### Create Questions

To Create a question go to  
`POST /questions`

```json
    {
        "quiz_id": 3,
        "text": "Which of these is a Hash?"	
    }
```

The response will be:

```json
    {
        "id": 8,
        "text": "Which of these is a Hash?",
        "quiz_id": 3,
        "created_at": "2018-09-25T19:43:02.565Z",
        "updated_at": "2018-09-25T19:43:02.565Z"
    }
```

To edit go to  
`PUT /questions/id`  
The request will be this
```json
    {	
        "text": "Which of these is not a Hash?"	
    }
```

The response will be the same as the create response but with the edit made  

To Delete a question:

`DELETE /questions/id`

Response will be:  
```json
    {
        "notice": "Question has been deleted"
    }
```
### Answers

To create an Answer Go to  
`POST /questions/id/answers`
Request:
```json
    {
		"text": "['John', 'Jeff']",
		"correct": false
	}
``` 

Response:

```json
    {
        "id": 26,
        "text": "['John', 'Jeff']",
        "question_id": 8,
        "correct": false,
        "created_at": "2018-09-25T20:09:11.573Z",
        "updated_at": "2018-09-25T20:09:11.573Z"
    }
```

To edit go to  
`PUT /questions/id/answers/id`  

The request will be the fields you want to edit, text or correct.  

To Delete:
`DELETE /questions/id/answers/id` 