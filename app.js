let idInput = document.getElementById("idInput")
let submitBtn = document.getElementById("submitBtn")



submitBtn.addEventListener("click" , ()=>{
    fetchData()
   
    
})



async function fetchData() {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_HEHsKcJIx3bw0E2852nVyCGlmWNwE&ipAddress=${idInput.value}`

    try{
        const respnse = await fetch(url)
        const data =  await respnse.json()
     
        displayData(data)
        updateMap(data)
        
    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  
}


function displayData(data) {
    let infoContainer = document.querySelector(".info-container")
    let content = `
    <ul>
        <li>
          <p>IP Address</p>
          <h2>${data.ip}</h2>
        </li>
        <li>
          <p> Location</p>
          <h2>${data.location.country}</h2>
        </li>
        <li>
          <p>Timezone</p>
          <h2>UTC-${data.location.timezone}</h2>
        </li>
        <li>
          <p>ISP</p>
          <h2>${data.isp}</h2>
        </li>
      </ul>
    
    `

    infoContainer.innerHTML = content
}


var map = L.map("map").setView([51.505, -0.09], 13);

let marker = document.querySelector("marker");

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);


function updateMap(data) {
    // Check if the data contains latitude and longitude
    if (data.location && data.location.lat && data.location.lng) {
        // Set the view of the map to the fetched location
        map.setView([data.location.lat, data.location.lng], 13);

        // Add a marker to the map at the fetched location
        L.marker([data.location.lat, data.location.lng]).addTo(map)
            .bindPopup(`<b>${data.ip}</b><br>${data.location.city}, ${data.location.country}`)
            .openPopup();
    } else {
        console.error('Location data is missing from the API response.');
    }
}