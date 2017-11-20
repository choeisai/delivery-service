# Delivery Service API

## Requirement

- mongodb server
- node version 8

## Installation

```
git clone https://github.com/karrung/delivery-service.git
cd delivery-service
yarn install
```

## Testing

```
yarn test
```

## Service Start

```
yarn start
```

## API Doc

### Create new routes

- request
```
method: post
url: http://localhost:3000/route
```

### Update routes

- request
```
method: put
url: http://localhost:3000/route/:route_id
body:
{
	"FD": 1
}
```

### Get delivery cost

- request
```
method: get
url: http://localhost:3000/pathcost?route=${ROUTE_ID}&path=${STRING}
```

### Get the number of possible delivery route

- request
```
method: get
url: http://localhost:3000/allroutes?route=${ROUTE_ID}&start=${START}&end=${END}&maxStop=${MAX_STOP}
```

### Get the cheapest delivery route between two town

- request
```
method: get
url: http://localhost:3000/shortest?route=${ROUTE_ID}&start=${START}&end=${END}
```