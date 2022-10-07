const http = require('http');
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const PEOPLE_URL = 'https://swapi.dev/api/people/';
//const VEHICLE_URL = 'https://swapi.dev/api/vehicles/';

app.route('/').get( (req, res) => {
	res.send(`Listening to localhost on port: ${PORT}`);
});


app.route('/api/metric/:metricId').get(async (req, res) => {
	let json = {'charts': []};
	try {
		const { metricId } = req.params;
		let people = await axios.get(PEOPLE_URL + metricId, {});
		let { name, vehicles } = people?.data;
		if (!vehicles.length){
			json.charts.push({
				"label": name,
				"values": [[]]
			});
		} else {
			const list = [];
			for (url of vehicles) {
				let vehicle = await axios.get(url, {});
				let { model } = vehicle.data;
				list.push(model);
			}
			json.charts.push({
				"label": name,
				"values": [list]
			});
		}
		res.send(json);
	} catch (err) {
		console.log(err.response.status)
		res.status(404).send('Person not found')
	}
});

app.listen(PORT, () => {
	console.log(`Listening to localhost on port: ${PORT}`);
});


