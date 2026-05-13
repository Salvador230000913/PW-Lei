var map = L.map('map').setView([51.505, -0.09], 5);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);



//dimensionar o mapa atraves da altura do header e footer
let elementoHeader = document.querySelector("header");
let alturaHeader = elementoHeader.getBoundingClientRect().height;
let footer = document.querySelector("footer");
let alturaFooter = footer.getBoundingClientRect().height;

 //definir a variavel altura footer no css
document.documentElement.style.setProperty('--alturaFooter',`${alturaFooter}px`);
 //definir a variavel altura header no css
document.documentElement.style.setProperty('--alturaHeader', `${alturaHeader}px`);

//criar icons com formato de avião para o mapa
//definir o avião
var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [20, 20],
        iconAnchor:   [10, 10],
        popupAnchor:  [100, 0]
    }
});

var aviaoVerde = new LeafIcon({iconUrl: 'imagens/aviao_verde.png'}),
    aviaoVermelho = new LeafIcon({iconUrl: 'imagens/aviao_vermelho.png'}),
    aviaoAzul = new LeafIcon({iconUrl: 'imagens/aviao_azul.png'});
//----------------------------------------------------------------------

//ao adicionar o aviao, adicionar logo um popup com as informacoes do voo

function adicionarAviao(longitude, latitude){
    informacoesPopUp = `<p>Longitude: ${longitude} <br />Latitude: ${latitude}</p>`
    var marcadorAviao = L.marker([longitude,latitude], {icon: aviaoVerde}).bindPopup(informacoesPopUp).addTo(map);
    marcadorAviao.on('click', zoomMarcador);

}
//Event handler, dar zoom no aviao selecionado
function zoomMarcador(e){
    map.setView(e.latlng, 8);
}


//testes
adicionarAviao(51.6, -0.09);