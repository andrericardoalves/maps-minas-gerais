import { Component, OnInit } from '@angular/core';
import 'leaflet';
import { MapsService } from './maps.service';
import { tileLayer, latLng, circle, polygon, marker } from 'leaflet';

declare let L;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

	options
	layersControl
	layers
	layer
	showLayer

	//https://github.com/Asymmetrik/ngx-leaflet
	//https://codesandbox.io/s/ngx-leaflet-geojson-country-border-wlyw4
  constructor(private mapsService: MapsService) { }

  ngOnInit() {
	//this.createMap();
	this.addMap();
  }

   createMap(){
		
		let myfrugalmap;
		let geojson;

		myfrugalmap = L.map('mapMG').setView([-19.9023386 , -44.1041379 ], 6);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(myfrugalmap);

		let info;

		info = new L.Control();

		info.onAdd = function () {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};


		info.update = function (props) {
			this._div.innerHTML = (props ? '<h3>Município: </h3>' +   '<h3>' + props.name + '</h3><br />'
				: '');
		};

		info.addTo(myfrugalmap);

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			myfrugalmap.fitBounds(e.target.getBounds());
		}

		function highlightFeature(e) {
			const layer = e.target;

			layer.setStyle({
				weight: 3,
				color: '#666',
				dashArray: '',
				fillOpacity: 0.2
			});

			if (!L.Browser.ie &&  !L.Browser.edge) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
		}

		//this.http.get('assets/departements.json').subscribe((json: any) => {
      this.mapsService.findAllCitys().subscribe((json: any) => {
		geojson =  L.geoJSON(json, {
				style: function(feature) {
					// switch (feature.properties.code) {
					// 	case '44': return {color: 'white', fillColor: 'red', fillOpacity: 0.1};
					// 	case '53':   return {color: 'white', fillColor: 'yellow', fillOpacity: 0.1};
					// 	case '72':   return {color: 'white', fillColor: 'orange', fillOpacity: 0.1};
					// 	case '85':   return {color: 'white', fillColor: 'green', fillOpacity: 0.1};
					// 	case '49':   return {color: 'white', fillColor: 'blue', fillOpacity: 0.1};
					// }
					return {color: 'white', fillColor: 'yellow', weight: 2, dashArray:3 , fillOpacity: 0.1};
				},
				onEachFeature: function onEachFeature(feature, layer) {
					layer.on({
						mouseover: highlightFeature,
						mouseout: resetHighlight,
						click: zoomToFeature
					});
				}
			}).addTo(myfrugalmap);
		});
   }
   
   addMap(){
	this.options = {
		layers: [
			tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
		],
		zoom: 5,
		center: latLng(-19.9023386 , -44.1041379)
	};

	this.layersControl = {
		baseLayers: {
			'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
			'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
		},
		overlays: {
			'Big Circle': circle([ -19.5320575,-46.0219098 ], { radius: 5000 }),
			'Big Square': polygon([[ -20.3912461,-43.5191553 ], [ -19.4556416,-44.2752558 ], [ -18.7959248,-44.6854457 ], [ -18.9218962,-48.3336058 ]])
		}
	}

	this.layers = [
		circle([ -19.4719991,-42.593603], { radius: 5000 }),
		polygon([[ -19.227365,-45.0190784 ], [ -19.1600143,-45.4629168 ], [ -19.603867,-46.9731262 ]]),
		marker([ -20.6151311,-46.0529024 ])
	];

	this.layer = circle([ -20.7454804,-42.9179702 ], { radius: 5000 });
	this.showLayer  = true; 
   }

   leafletMapReady(map: L.Map){
	
	let info;

		info = new L.Control();

		info.onAdd = function () {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};


	info.update = function (props) {
			this._div.innerHTML = (props ? '<h3>Município: </h3>' +   '<h3>' + props.name + '</h3><br />'
				: '');
	};

	info.addTo(map);

	let geoJSON;

	function resetHighlight(e) {
		geoJSON.resetStyle(e.target);
		info.update();
	}

	function highlightFeature(e) {
		var layer = e.target;
  
		layer.setStyle({
		  weight: 5,
		  color: "#666",
		  dashArray: "",
		  fillOpacity: 0.7
		});
  
		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		  layer.bringToFront();
		}
		info.update(layer.feature.properties);
	 }	

	 function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
		console.log(e, map);
	 }
	
	 const onEachFeature = (feature, layer) => {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	};
	  
	this.mapsService.findAllCitys().subscribe((json: any) => {
		
		geoJSON =  L.geoJSON(json, {
		style: function(feature) {
			return {color: 'white', fillColor: 'yellow', weight: 2, dashArray:3 , fillOpacity: 0.1};
		},
		onEachFeature: onEachFeature
		}).addTo(map);
	});

	
  }

}
