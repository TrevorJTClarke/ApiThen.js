# ApiThen

RESTful Api Promise Chain Module

	"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time." - Edison

Author: [Trevor Clarke](https://github.com/TrevorJTClarke)

### Why?

This module is a study in the simplification of common API/module/REST needs for most apps. I have found many times a need for a module that wraps xhr interactions, gives easy chainable & readable methods, and returns an A+ promise. The goal is a polymorphic, configurable & framework independent module.

----

### Project Setup

**Initializing The Project**

`npm install`

**Commands:**

`npm run dev` - Builds continuously (TODO:)

`npm start` - runs the local dev server

## Usage & Examples

##### BASIC EXAMPLE:

	let Api = new ApiThen
	Api.get().users().list(20, 0).then((res) => {
	 console.log("Api.users paginated", res)
	}, (err) => {
	 console.error(err)
	})

##### QUICK SETUP:

1. Store the instance somewhere, wherever you need baseline params/options to begin with.


	global.Api = new ApiThen({
		headers: {}
	})


2. Use the methods like you assume you should ;)


	Api.get().users(123456789).then(() => {})

##### ADDITIONAL OPTIONS:

1. Change headers/options any time, or per query.


	Api.options({
		headers: {}
	})

## API

TBD: Check back :)
