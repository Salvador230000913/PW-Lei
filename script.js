var map = L.map('map', {preferCanvas: true, renderer: L.canvas()}).setView([51.505, -0.09], 5);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_no_buildings/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    minZoom: 2,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);
//definir os limites do mapa
var corner1 = L.latLng(-100, -200);
var corner2 = L.latLng(100, 200);
var bounds = L.latLngBounds(corner1, corner2);
map.setMaxBounds(bounds);
map.on('click', fecharInfoBox);

//dimensionar o mapa atraves da altura do header e footer
let header = document.querySelector(".header");
let footer = document.querySelector(".footer");
let alturaFooter = footer.getBoundingClientRect().height;

 //definir a variavel altura footer no css
document.documentElement.style.setProperty('--alturaFooter',`${alturaFooter}px`);
 //definir a variavel altura header no css

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
//supostamente serve parar criar um canvas no mapa e depois cada aviao vai ser "pintado" no canvas
var renderizadorCanvas = L.canvas({padding: 0.5});

//script leaflet.canvas-markers
//https://github.com/eJuke/Leaflet.Canvas-Markers
var canvasIconLayer = L.canvasIconLayer({}).addTo(map);




function adicionarAviao(latitude, longitude){
    if ((longitude != null) && (latitude!=null)){
         informacoesPopUp = `<p>Longitude: ${longitude} <br />Latitude: ${latitude}</p>`
        
            var marcadorAviao = L.marker([latitude,longitude],
                 {icon: aviaoVerde, renderer: renderizadorCanvas, latitude: latitude, longitude: longitude} )
                 .bindPopup(informacoesPopUp);
         
            canvasIconLayer.addOnClickListener(zoomMarcador);
            canvasIconLayer.addOnClickListener(carregarInformacoesInfoBox);
            canvasIconLayer.addMarker(marcadorAviao);
              

    }

}
//Event handler, dar zoom no aviao selecionado
function zoomMarcador(e){
    map.setView(e.latlng, 15);
}
function carregarInformacoesInfoBox(e){
    elementoInfoBox.classList.add("ativa");
}
function fecharInfoBox(e){
    elementoInfoBox.classList.remove("ativa");
    
    
}


//evitar o arrastar do mapa atraves do header e da caixa de informacao
L.DomEvent.disableClickPropagation(header);
L.DomEvent.disableClickPropagation(footer);
var elementoInfoBox = document.querySelector(".info-box");
L.DomEvent.disableClickPropagation(elementoInfoBox);
var elementoSearchDiv = document.querySelector(".search-bar");
L.DomEvent.disableClickPropagation(elementoSearchDiv);




//infoBox botao
var elementoBotaoInfoBox = document.querySelector("#fechar_info-box");
elementoBotaoInfoBox.addEventListener('click', fecharInfoBox);
//fecha o popup do aviao
elementoBotaoInfoBox.addEventListener('click', function(){
    map.closePopup();
});


fetch("dummy_data/flights.json")
    .then(function (resposta){
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then(function(resposta){
        processarInformacaoJsonAviao(resposta);
    })

function processarInformacaoJsonAviao(respostaJson){
    listaDeVoos = respostaJson.states;
    for (const voo of listaDeVoos) {
        latitude = voo[5];
        longitude = voo[6];
        adicionarAviao(longitude, latitude);
    }
}

function procurarVoo(){
    var codigoVoo = elementoBoxSearch.value;
    if(codigoVoo != ""){
    elementoBoxSearch.value = "";
    fetch("dummy_data/flights.json")
        .then(function (resposta){
            if(resposta.ok){
                return resposta.json();
            }
        })
        .then(function(resposta){
            listaDeVoos = resposta.states;
            let encontrado = false;
            for (const voo of listaDeVoos){
                if (codigoVoo == voo[0]){
                    longitude = voo[5];
                    latitude = voo[6];
                    procurarMarkerPorCoordenadas(latitude, longitude);
                    encontrado = true;
                }
            }
            if (encontrado == false){
                alert(`Não foi encontrado nenhum voo com o código: ${codigoVoo}`);
            }
        })
    }
}
function procurarMarkerPorCoordenadas(latitude, longitude){
    map.setView(L.latLng(latitude,longitude), 15);
}
var elementoBoxSearch = document.querySelector("#flightSearchBox");
var elementoBotaoSearch = document.querySelector("#flightSearchSubmit");
elementoBotaoSearch.addEventListener('click', procurarVoo);
