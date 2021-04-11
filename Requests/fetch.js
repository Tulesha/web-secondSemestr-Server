const { model } = require("mongoose");
const fetch = require("node-fetch");
const conf = require("./config");

async function fetchCity(params) {
    const url = new URL(conf.url);
    url.searchParams.append("appid", conf.appid);
    url.searchParams.append("units", "metric");

    for (const param in params) {
        url.searchParams.append(param, params[param]);
    }

    let data = await fetch(url);
    if (data.status === 200) {
        return await data.json();
    }
}

async function fetchCityByName(cityName) {
    return fetchCity({q: cityName});
}

async function fetchCityByLocation(lat, lon) {
    return fetchCity({lat: lat, lon:lon});
}

module.exports = {
    fetchCityByName, fetchCityByLocation
}
