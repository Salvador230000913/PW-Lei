var map = L.map('map').setView([51.505, -0.09], 5);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

//var marker = L.marker([51.5, -0.09]).addTo(map);

//marker.bindPopup("<b>Hello world!</b><br>I am a popup.");


//dimensionar o mapa atraves da altura do header e footer
let elementoHeader = document.querySelector("header");
let alturaHeader = elementoHeader.getBoundingClientRect().height;
let footer = document.querySelector("footer");
let alturaFooter = footer.getBoundingClientRect().height;

 //definir a variavel altura footer no css
document.documentElement.style.setProperty('--alturaFooter',`${alturaFooter}px`);
 //definir a variavel altura header no css
document.documentElement.style.setProperty('--alturaHeader', `${alturaHeader}px`);

criarAviao(51.5, -0.09, "Avião 1");
criarAviao(60.51, -0.1, "Avião 2");

function criarAviao(lat, lng, nomeAviao){
    let novoMArker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng]);
    //Não é utilizado o "addEventListener" porque o marker é um objeto do leaflet
    //Para ficar a escuta utilizamos o evento "on" do leaflet
    novoMArker.on("click",detalhesAviao);
}

function detalhesAviao(e){
    e.originalEvent.preventDefault();

    console.log("Detalhes do avião");
}