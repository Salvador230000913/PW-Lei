var map = L.map('map').setView([51.505, -0.09], 5);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.");


//dimensionar o mapa atraves da altura do header e footer
let elementoHeader = document.querySelector("header");
let alturaHeader = elementoHeader.getBoundingClientRect().height;
let footer = document.querySelector("footer");
let alturaFooter = footer.getBoundingClientRect().height;

 //definir a variavel altura footer no css
document.documentElement.style.setProperty('--alturaFooter',`${alturaFooter}px`);
 //definir a variavel altura header no css
document.documentElement.style.setProperty('--alturaHeader', `${alturaHeader}px`);
 