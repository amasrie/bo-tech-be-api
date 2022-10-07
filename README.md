# External API call test

Run using `npm run start`

The only available endpoint in this service is `/api/metric/:metricId`. The received parameter represents a numeric id of a person to be found using the swapi API for people `https://swapi.dev/api/people`. After that, the vehicles API will be called in order to get the model of each vehicle that belongs to that person (`https://swapi.dev/api/vehicles`), resulting in an outpput similar to the following one:

`{"charts":[{"label":"Luke Skywalker","values":[["t-47 airspeeder","74-Z speeder bike"]]}]}`
