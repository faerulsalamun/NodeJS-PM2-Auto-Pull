# NodeJS Auto Pull PM2

[![Build Status](https://travis-ci.org/faerulsalamun/NodeJS-PM2-Auto-Pull.svg?branch=master)](https://travis-ci.org/faerulsalamun/NodeJS-PM2-Auto-Pull)
[![Dependency Status](https://david-dm.org/faerulsalamun/NodeJS-PM2-Auto-Pull.svg)](https://david-dm.org/faerulsalamun/NodeJS-PM2-Auto-Pull)
[![devDependency Status](https://david-dm.org/faerulsalamun/NodeJS-PM2-Auto-Pull/dev-status.svg)](https://david-dm.org/faerulsalamun/NodeJS-PM2-Auto-Pull#info=devDependencies)
 
## How to Use

* Install forever (npm i forever -g)
* (Optional) Fork the repo
* Clone the repo to your local

```
$ git clone https://github.com/faerulsalamun/NodeJS-PM2-Auto-Pull
```

* (Optional) update repo remote url
* Update config.js data (port,secretKey,etc)
* `cd` into project folder and run `npm install` 

```
$ npm install
```

* Start the server app

```
$ forever start app.js
```

* Add webhooks to http://YOUR_IP_ADDRESS:7920/hook?secretKey=YOUR_SECRET_KEY

Modify from source code 
https://github.com/pm2-hive/pm2-auto-pull

# License
MIT
