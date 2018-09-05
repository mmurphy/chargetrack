# Charge Tracker

## Introduction

Charge Tracker is a simple app to track re-charges and charge usage of an Electric Vehicle.  While it is primarly a single-user, offline app, It will use fh-sync to store the captured data in the clouds.

## History

I’ve been not doing this app for a long time (mostly when it was going to be a fuel tracker to track diesel usage)

## Overview

App to allow a users to record the current charge percentage, time, and odometer as various times (at the end of journeys, before and after the battery is charged)

* Uses a simple web form to accept battery percentage, and odometer.
* Stores that data with a timestamp, and comment.
* Allows viewing of the list of historic data.
* Syncs the collected data with a server, for backup purposes.  The server does NOT need to be permanently online
* Uses docker-compose to setup the server, serve the client app, and provide the database

## Future

* Install on Kubernetes
* Make an app binary (possibly Cordova, or Native)
* Graph usage (on server, or client, or both)

## Plan
* Setup [empty HTML app](https://github.com/mmurphy/syncsample) syncing one tracker collection with the server
  This is based on the sample apps included with [fh-sync](https://github.com/feedhenry/fh-sync.git) and [fh-sync-js](https://github.com/feedhenry/fh-sync-js.git)
* Client, server, database
* Add form for accepting the data
* Store charge%, odometer, time, comment
* Add list to display previous data


## Running

It starts containers with redis and mongdb which will be used by the sync server to store data.  The mongo data is persisted in the `data` folder.
There are also `client` and `server` folders, which are mounted inside 2 containers to run the server app, and serve the client app on port 8000..

## client

This contains a slightly modified sample app from the [`fh-sync-js`](https://github.com/feedhenry/fh-sync-js) module.  This app is served on port 8000 and it will sync with the server app.

## server

This contains a slightly modified sample app from the [`fh-sync`](https://github.com/feedhenry/fh-sync) module, it syncs wiht clients which connect, and uses the redis and mongodb containers to persist the data.

## Installation

```
git clone https://github.com/mmurphy/chargetrack.git
cd chargetrack
docker-compose up
# you can now point a browser at http://localhost:8000
```

## References
* fh-sync
  * repo (https://github.com/feedhenry/fh-sync.git)
  * module (https://www.npmjs.com/package/fh-sync)
* fh-sync-js
  * repo (https://github.com/feedhenry/fh-sync-js.git)
  * module (https://www.npmjs.com/package/fh-sync-js)
* syncsample
  * repo (https://github.com/mmurphy/syncsample)