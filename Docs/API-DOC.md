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
      "username": "username",
      "password": "password"
    }
```
The response will be:
```json
{
    "id": 00,
    "username": "bk1311",
    "password_digest": "$2a$10$AKkKALZ3wUmgfFT1RcuKTOM97eiin/bSWMqVHDGVbuop..GkJYY4e",
    "api_token": "gRgmeaeDgMeo99cSfoBEW3gi",
    "admin": true/false
    "created_at": "2018-09-17T19:15:40.646Z",
    "updated_at": "2018-09-17T19:15:40.646Z"
}
```

### If User exist 

  Go to `/login` to login with username and password  
  On successful login the response will be the Users's api_token  
```json
    {
      "username": "test1",
      "token": "fMcBk3LqpkdYNbtTdJy1RMzJ",
      "admin": true/false
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

....coming  

### Admin
....coming
