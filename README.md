#  Holiday Extras Code Test
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![code style: eslint](https://img.shields.io/badge/lintener-eslint-yellowgreen)](https://github.com/eslint/eslint)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![!npm type definitions](https://img.shields.io/npm/types/typescript)](https://github.com/microsoft/TypeScript)
[![!npm type definitions](https://img.shields.io/badge/framework-express-red)](https://github.com/expressjs/express)
[![!npm type definitions](https://img.shields.io/badge/development-docker-blue)](https://github.com/docker)

### Info
This is a code test for HolidayExtras.
The aim of this test is to create an API in order to manage a user entity.
To do so, I decided to use Docker & docker compose in order to run a MongoDB instance.

### Settings
The following commands will build and run the mongodb image, and the user container
 - Install all the dependencies with `yarn or npm i`
 - cd to the architecture folder
`cd architecture`
 - build the docker image `docker-compose -f development.yml build`
 - run the docker image `docker-compose -f development.yml up`

### Usage
There is a swagger.yml file to be used in postman in order to have a collection ready to be tested.