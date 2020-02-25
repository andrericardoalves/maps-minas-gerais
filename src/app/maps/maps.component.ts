import { Component, OnInit } from '@angular/core';
import 'leaflet';
import { MapsService } from './maps.service';

declare let L;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  
  
  constructor(private mapsService: MapsService) { }

  ngOnInit() {
    this.createMap();
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
   

}
