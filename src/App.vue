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
</script>

<style></style>
