<p> <a href='https://travis-ci.com/gracelungu/politico'><img src='https://travis-ci.com/gracelungu/politico.svg?branch=develop' alt='Build status' /></a>   <a href='https://coveralls.io/github/gracelungu/politico?branch=develop'><img src='https://coveralls.io/repos/github/gracelungu/politico/badge.svg?branch=develop&kill_cache=1' alt='Coverage Status' /></a>   <a href="https://codeclimate.com/github/gracelungu/politico/maintainability"><img src="https://api.codeclimate.com/v1/badges/34cfd0c34cd614c8481e/maintainability" /></a>   <a href="https://codeclimate.com/github/gracelungu/politico/test_coverage"><img src="https://api.codeclimate.com/v1/badges/34cfd0c34cd614c8481e/test_coverage" /></a></p>

# Politico

A web-application that enables citizens give their mandate to politicians running for different government offices

## Getting Started

To get the project up and running on your local machine, please follow these instructions.

### Prerequisites

Make sure you have node -v 10 and above installed.

Or follow these steps to install node

#### Node installation on OS X
    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Download the intaller from the [official Node.js website](http://nodejs.org/) 

#### Clone the project from github

```
 $ git clone  https://github.com/gracelungu/politico
```
#### Install the required dependencies found in package.json

```
 $ npm install
```

## Start the server

```
 $ npm start
```

## Running the tests

Testing the code coverage with jasmine 
```
 $ jasmine
```
Testing and Getting the code coverage report 
```
 $ npm test
```
Testing the code style with eslint
```
 $ ./node_modules/.bin/eslint server
```
## Deployment

The application template is hosted on github pages
<a href="https://gracelungu.github.io/politico/UI">https://gracelungu.github.io/politico/UI</a>

### Deploying on heroku
Make sure you have logged in to heroku
```
 $ git push heroku develop:master
```

#### Endpoints to authentificate the user
HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
POST | /api/v1/auth/signup | False | Create a user
POST | /api/v1/auth/login | True | Login the user
POST | /api/v1/auth/reset | True | Reset the password

#### Endpoints to create, get, edit and delete parties.
HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
POST | /api/v1/parties | False | Create a party
GET | /api/v1/parties | True | Get all parties
GET | /api/v1/parties/<party_id> | True | Get a specific party
PATCH | /api/v1/parties/<party_id>/name | False | Edit a single party name
DELETE | /api/v1/parties/<product_id> | False | Delete a single party

#### Endpoints to create, and get offices
HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
POST | /api/v1/offices | False | Create an office
GET | /api/v1/offices | True | Get all offices
GET | /api/v1/offices/<office_id> | True | Get a specific office

#### Endpoint to register a candidate
HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
POST | /api/v1/office/<office_id>/register | False | Register a candidate

#### Endpoint to vote
HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
POST | /api/v1/votes | False | Vote

#### Endpoint to get results for a single office
HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
GET | /api/v1/office/<office_id>/result | True | Get office results

## Author

* **Grace Lungu** - *kivubox@gmail.com* - [github](https://github.com/gracelungu)

## License

This project is licensed under the MIT License 

## Acknowledgments

* My thanks goes to my learning facilitators and team members
