const baseurl="https://api.nasa.gov/"

const launchesBtn=document.querySelector('[data-section="launches"]')
const today_in_spaceBtn=document.querySelector('[data-section="today-in-space"]')
const planets_btn=document.querySelector('[data-section="planets"]')
const load_date_btn=document.querySelector("#load-date-btn")
const today_date_btn=document.querySelector("#today-apod-btn")

const planetsGrid=document.querySelector("#planets-grid");

const launchesGride=document.querySelector("#launches-grid");

const planetName=document.querySelector("#planet-detail-name");
const planetDescription=document.querySelector("#planet-detail-description");
const planetImage=document.querySelector("#planet-detail-image");
const planetDistance=document.querySelector("#planet-distance");
const planetRadius=document.querySelector("#planet-radius");
const planetmass=document.querySelector("#planet-mass");
const planetdesity=document.querySelector("#planet-density");
const planet_orbital_period=document.querySelector("#planet-orbital-period");
const planetRotation=document.querySelector("#planet-rotation");
const planetmoons=document.querySelector("#planet-moons");
const planetgravity=document.querySelector("#planet-gravity");
const planetdiscoverer=document.querySelector("#planet-discoverer");
const planet_discovery_date=document.querySelector("#planet-discovery-date");
const planet_body_type=document.querySelector("#planet-body-type");
const planetVolum=document.querySelector("#planet-volume");
const planet_temp=document.querySelector("#planet-temp");
const planet_perihelion=document.querySelector("#planet-perihelion");
const planet_escap=document.querySelector("#planet-escape");
const planet_facts=document.querySelector("#planet-facts");
const planetComparisonTbody = document.querySelector("#planet-comparison-tbody");



const launches=document.querySelector("#launches");
const today_in_space=document.querySelector("#today-in-space");
const planets = document.querySelector("#planets");
const apod_image=document.querySelector("#apod-image");
const apod_title=document.querySelector("#apod-title");
const apod_date_details=document.querySelector("#apod-date-detail");
const apod_explanation=document.querySelector("#apod-explanation");
const apod_copyright=document.querySelector("#apod-copyright");
const apod_date=document.querySelector("#apod-date");
const apod_media_type=document.querySelector("#apod-media-type");
const apod_data_info=document.querySelector("#apod-date-info");
const apod_date_input=document.querySelector("#apod-date-input");
const selected_date=document.querySelector("#selected-date");





planets_btn.addEventListener("click",function(e){
  e.preventDefault();
  showSection(planets)
  callPlanets();
  
})



const callPlanets=async function(){

  const results=await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets")
  const data=await results.json()
  console.log(data);

  var cartona=""
  for(var i =0 ; i< data.bodies.length ; i++){
   const planet=data.bodies[i];
 
   cartona+=`<div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
             data-planet-id="${planet.englishName.toLowerCase()}"
              style="--planet-color: #eab308"
              onmouseover="this.style.borderColor='#eab30880'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="${planet.image}"
                  alt="Mercury"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">${planet.englishName}</h4>
              <p class="text-xs text-slate-400 text-center"> ${(planet.semimajorAxis*1000 /149597870700).toFixed(2)} AU</p>
            </div>`
  }
            // /////////////////////////////
            var comparisonCartona = "";

for (var i = 0; i < data.bodies.length; i++) {

    var planet = data.bodies[i];

    var distance = (planet.semimajorAxis * 1000 / 149597870700).toFixed(2);

    var diameter = (planet.meanRadius * 2).toLocaleString();

    var mass = (
        planet.mass.massValue *
        Math.pow(10, planet.mass.massExponent) /
        5.9722e24
    ).toFixed(3);

    var orbitalPeriod = planet.sideralOrbit;

    var moons = planet.moons ? planet.moons.length : 0;

    var type = planet.bodyType;

    comparisonCartona += `
        <tr class="hover:bg-slate-800/30 transition-colors">

            <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
                <span class="font-semibold text-sm md:text-base">
                    ${planet.englishName}
                </span>
            </td>

            <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300">
                ${distance}
            </td>

            <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300">
                ${diameter}
            </td>

            <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300">
                ${mass}
            </td>

            <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300">
                ${orbitalPeriod.toLocaleString()} days
            </td>

            <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300">
                ${moons}
            </td>

            <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300">
                ${type}
            </td>

        </tr>
    `;
}

planetComparisonTbody.innerHTML = comparisonCartona;
   
    
  
  planetsGrid.innerHTML=cartona;

  const planetcards=document.querySelectorAll(".planet-card");
  const planetDetails = document.querySelector("#planets-grid").nextElementSibling;
  for(let i=0 ; i <planetcards.length ; i++){
  let card=planetcards[i]

  planetcards[i].addEventListener("click",function(){
    var planetId = card.dataset.planetId;
    var selectedPlanet = data.bodies.find(function(planet) {
    return planet.englishName.toLowerCase() === planetId;
});
console.log(selectedPlanet);
    planetName.textContent = selectedPlanet.englishName;
    planetImage.src = selectedPlanet.image;
    planetDescription.textContent = selectedPlanet.description;
    planetDistance.textContent = (selectedPlanet.semimajorAxis*1000/149597870700).toFixed(2)+"AU";
    planetRadius.textContent = selectedPlanet.meanRadius.toLocaleString()+"km"
    planetmass.textContent = selectedPlanet.mass.massValue.toFixed(2) +" × 10^" +selectedPlanet.mass.massExponent +" kg";
    planetdesity.textContent = selectedPlanet.density +" g/cm³";
    planet_orbital_period.textContent = selectedPlanet.sideralOrbit+" days";
    planetRotation.textContent = selectedPlanet.sideralRotation+" hours";
    planetmoons.textContent = selectedPlanet.moons?selectedPlanet.moons.length: 0;
    planetgravity.textContent = selectedPlanet.gravity+"m/s²";
    planetdiscoverer.textContent = selectedPlanet.discoveredBy || "Unkown";
    planet_discovery_date.textContent = selectedPlanet.discoveryDate || "Ancient times";
    planetVolum.textContent = selectedPlanet.bodyType  || "Unknown";
   planetVolum.textContent = selectedPlanet.vol?.volValue
    ? selectedPlanet.vol.volValue.toFixed(2) + " × 10^" + selectedPlanet.vol.volExponent + " km³"
    : "Unknown";
      planet_temp.textContent = selectedPlanet.avgTemp+" k";
      planet_perihelion.textContent =(selectedPlanet.perihelion / 1000000).toFixed(1) + "M km";
      planet_escap.textContent =selectedPlanet.escape  + "km/s";
  
    // planetDetails.classList.remove("hidden");
    planet_facts.innerHTML = `
    <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">
            Mass: ${selectedPlanet.mass.massValue} × 10^${selectedPlanet.mass.massExponent} kg
        </span>
    </li>

    <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">
            Surface gravity: ${selectedPlanet.gravity} m/s²
        </span>
    </li>

    <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">
            Density: ${selectedPlanet.density} g/cm³
        </span>
    </li>

    <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">
            Axial tilt: ${selectedPlanet.axialTilt}°
        </span>
    </li>
`;


    
   

  })
}
  
}

/////////////// launches/////////////////


var displayLaunches=function(results){
    var cartona="";
    for(var i=0 ; i < results.length; i++){
        var launch=results[i]

          var status = launch.status?.abbrev || "TBD";
    var company = launch.launch_service_provider?.name || "Unknown";
    var rocket = launch.rocket?.configuration?.name || "Unknown";
    var location = launch.pad?.name || "Unknown";
    var date = launch.net
      ? new Date(launch.net).toLocaleString()
      : "TBD";

    var image = launch.image?.image_url
    ? `<img src="${launch.image.image_url}" alt="${launch.name}" class="w-full h-48 object-cover">`
    : '<div class="h-48 bg-slate-900/50 flex items-center justify-center"><i class="fas fa-rocket text-5xl text-slate-700"></i></div>';

    cartona += `
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group">
        <div class="relative">
          ${image}
          <div class="absolute top-3 right-3">
            <span class="px-3 py-1 bg-blue-500/90 text-white rounded-full text-xs font-semibold">
              ${status}
            </span>
          </div>
        </div>

        <div class="p-5">
          <h4 class="font-bold text-lg mb-3 text-white group-hover:text-blue-400">
            ${launch.name || "Unnamed launch"}
          </h4>

          <p class="text-sm text-slate-400 mb-3">
            <i class="fas fa-building"></i> ${company}
          </p>

          <div class="space-y-2 mb-4 text-sm text-slate-300">
            <p><i class="fas fa-calendar text-slate-500"></i> ${date}</p>
            <p><i class="fas fa-rocket text-slate-500"></i> ${rocket}</p>
            <p><i class="fas fa-map-marker-alt text-slate-500"></i> ${location}</p>
          </div>

          <button class="w-full px-4 py-2 bg-slate-700 rounded-lg text-white">
            Details
          </button>
        </div>
      </div>
    `;
  }

  launchesGride.innerHTML = cartona;
    
}


const callApi=async function(){
   try{
    const response=await fetch('https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10',{
        method:"GET"
    })


    if(!response.ok){
        throw new Error("Error",response.status)
    }
    const payload=await response.json();
    
    
    displayLaunches(payload.results)
     
   }

   catch(error){
    console.log(error);
    

   }
   
    
}

launchesBtn.addEventListener("click",function(e){
    e.preventDefault()
   showSection(launches);
  callApi();
  
    
})


// ////////////////////photo////////////////////////////

const callapi_image=async function(date){
    try{
        const results = await fetch(`https://api.nasa.gov/planetary/apod?api_key=BBq7bz9TLHtRDpFmWdBJjMF9jJHrcMhnWbKh6cGt&date=${date}`);
         if(!results.ok){
            throw new Error("API Error: "+results.status)
        }
    

        const data=await results.json();
        console.log(data);
        console.log(data.date);

        apod_image.src=data.hdurl;
        apod_title.textContent=data.title
        apod_date.textContent=data.date
        apod_explanation.innerHTML=data.explanation
        apod_copyright.innerHTML=data.copyright

        apod_media_type.textContent=data.media_type
        apod_data_info.textContent=data.date
        apod_date_details.textContent=data.date

    }
    catch(error){
        console.log(error);
        
    }

}

load_date_btn.addEventListener("click",function(){

    let date= apod_date_input.value
     callapi_image(date);
   
})


// photo today

today_date_btn.addEventListener("click",function(){
   let date= apod_date_input.value
  getphotoday();

 
})

const getphotoday= async function getphotoday(){
 try{
      const results=await fetch(`https://api.nasa.gov/planetary/apod?api_key=WwtdWbzpRQBdTHDdtpJ8m7LzhC9q9DHmBDGWddQH`)

      if(!results.ok){
         throw new Error("API Error: "+results.status)
      }
      const data= await results.json()

        apod_image.src=data.hdurl;
        apod_title.textContent=data.title
        apod_date.textContent=data.date
        apod_explanation.innerHTML=data.explanation
        apod_copyright.innerHTML=data.copyright

        apod_media_type.textContent=data.media_type
        apod_data_info.textContent=data.date
        apod_date_details.textContent=data.date

        apod_date_input.value=data.date
        selected_date.textContent=data.date;

}
catch(error){
    console.log(error);
        
}

}


apod_date_input.addEventListener("change", function () {
    selected_date.textContent = apod_date_input.value;
});

// /////////////////////////
today_in_spaceBtn.addEventListener("click", function(e){
    e.preventDefault();
    showSection(today_in_space);
    // getphotoday();
});


const showSection = function(section){
    launches.classList.add("hidden");
    today_in_space.classList.add("hidden");
    planets.classList.add("hidden");

    section.classList.remove("hidden");
}





