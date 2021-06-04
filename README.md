# Remote:
```ruby
url: https://mighty-plains-90447.herokuapp.com/
adminAccount: huykkk
adminPassword: 000000
```
# How to run/build

### Install packages
```ruby
$ npm install
```
### Set up database
```ruby
$ Install xampp
$ Start Apache and MySQL modules
$ Add new account in phpmyadmin
```
### Setup environment
```ruby
$ Create a .env file, set up like:
PORT=8080
DB_HOST=localhost
DB_PORT=3306
DB_NAME=test
DB_USERNAME=test   #as your name  
DB_PASSWORD=123456  # as your password
SECRECT_KEY=1a2b3c4d
And put in backend folder
# remember do exactly
```
### Run
```ruby
$ npm start
```
### Build
```ruby
$ npm run build
```

# Script
### Drop all tables when schema change
```ruby
$ Step 1: Copy content script/dropAllTables.sql and change name database
$ DROP PROCEDURE IF EXISTS `drop_all_tables`;
$ Step 2: Paste to SQL script in this database on remote and execute
```


