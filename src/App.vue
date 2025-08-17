<template>
  <div
    class="weather w-[100%] h-[100%] flex flex-col items-center"
    style="justify-content: space-evenly"
  >
    <div
      class="weather-section w-[100%] h-[100%] flex flex-col items-center"
      style="justify-content: space-evenly"
    >
      <input
        @keydown.enter="FetchWeatherData"
        v-model="CountryValue"
        class="weather-input w-[100%] rounded-[0.5rem] placeholder-black placeholder-opacity-100 focus:bg-[white]"
        style="padding: 0.5rem 1rem"
        placeholder="Insert a city or country"
        type="text"
      />

      <div class="weather-headers flex flex-col justify-center items-center">
        <div class="weather-region flex flex-col justify-center items-center">
          <h2 class="region-city text-xl" style="color: black">City</h2>
          <h2 class="region-country text-xl" style="color: black">Country</h2>
        </div>

        <h3 class="weather-date text-xl" style="color: black">Current Date</h3>
      </div>

      <h1 class="weather-temp text-3xl" style="color: black">Current Temp</h1>
      <h2 class="weather-status text-2xl" style="color: black">Weather Status</h2>

      <div class="weather-temps">
        <h3 class="max-temp text-xl" style="color: black">Max Temp</h3>
        <h3 class="min-temp text-xl" style="color: black">Min Temp</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'App',
  setup() {
    'use strict'
    let CountryValue = ref('')
    let WeatherAPI = reactive({
      url: 'https://api.openweathermap.org/data/2.5/weather?q=',
      key: '',
    })
    let ReceivedWeatherData = reactive(null);

    async function GetKey() {
      try {
        let Response = await axios.get('http://localhost:3100/api/weather/key?t=', Date.now())
        let Data = Response.data
        let Key = Data.key

        WeatherAPI.key = Key
      } catch (error) {
        console.log(error)
      }
    }

    async function FetchWeatherData() {
      let Response = await axios.get(`${WeatherAPI.url}${CountryValue.value}&appid=${WeatherAPI.key}`)
      ReceivedWeatherData = Response.data;

      DisplayData(ReceivedWeatherData);
    }

    function DisplayData(data) {
      let CityEl = document.querySelector(".region-city");
      let CountryEl = document.querySelector(".region-country");
      let DateEl = document.querySelector(".weather-date");
      let TempEl = document.querySelector(".weather-temp");
      let StatusEl = document.querySelector(".weather-status");
      let MaxTempEl = document.querySelector(".max-temp");
      let MinTempEl = document.querySelector(".min-temp");

      CityEl.innerHTML = data.name;
      CountryEl.innerHTML = data.sys.country;
      DateEl.innerHTML = ShowTime();
      TempEl.innerHTML = `${Math.floor(data.main.temp - 273.15)}°C`;
      StatusEl.innerHTML = data.weather[0].main;
      MaxTempEl.innerHTML = `${Math.floor(data.main.temp_max - 273.15)}°C`;
      MinTempEl.innerHTML = `${Math.floor(data.main.temp_min - 273.15)}°C`;
    }

    function ShowTime() {
      let Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let Months = ["January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"];

      let RightNow = new Date();
      let ThisDay = Days[RightNow.getDay()];
      let ThisMonth = Months[RightNow.getMonth()];
      let ThisYear = RightNow.getFullYear();
      let ThisDate = RightNow.getDate();

      return `${ThisDay} ${ThisMonth} ${ThisDate}, ${ThisYear}`;
    }

    return {
      GetKey,
      FetchWeatherData,
      DisplayData,
      ShowTime,
      CountryValue,
      WeatherAPI,
      ReceivedWeatherData,
    }
  },
  mounted() {
    this.GetKey()
  },
}
</script>

<style></style>
