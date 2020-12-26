import { Component, OnInit } from '@angular/core';
import 'leaflet';
import { MapsService } from './maps.service';
import { latLng, MapOptions , Map } from 'leaflet';

declare let L;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

	map: Map
	options : MapOptions
	geoJSON: any
	info: any;
	
	
  constructor(private mapsService: MapsService) { }

  ngOnInit() {
	this.addLayers();
  }
   
  
  addLayers(){
  let mapboxAccessToken =	'pk.eyJ1IjoiYW5kcmVyaWNhcmRvYWx2ZXMiLCJhIjoiY2tqNjA0dWNvNG5jbzJzbHJ6dmk0YTRyeSJ9.lapluwxryTGNiXQz1Zp14A';
  
  const newLayer =  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
    id: 'mapbox/light-v9',
    attribution: '...',
    tileSize: 512,
    zoomOffset: -1
  })

	this.options = {
		layers: [ newLayer ],
		zoom: 6,
		center: latLng(-19.9023386 , -44.1041379)
	};
   }

  
  resetHighlight(e) {
	this.geoJSON.resetStyle(e.target);
   
  }

  zoomToFeature(e) {
	this.map.fitBounds(e.target.getBounds());
  }

  highlightFeature(e) {
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

	this.info.update(layer.feature.properties);
}

 onEachFeature(feature, layer) {
	
	layer.on({
		mouseover: (e) => this.highlightFeature(e),
		mouseout: (e) => this.resetHighlight(e),
		click: (e) => this.zoomToFeature(e)
	});
  }

   async leafletMapReady(map: Map){
	this.map = map;

	const cities = await this.mapsService.findAllCitys()
		
	  this.geoJSON =  L.geoJSON(cities, {
		
			style: (feature) => {
			return {color: 'white', fillColor: '#BD0026', weight: 2, dashArray:1 , fillOpacity: 0.1};
		},
		
		onEachFeature: (feature: any, layer: any) => { this.onEachFeature(feature, layer)}
		});
	
		this.geoJSON.addTo(this.map);

		this.infoMap();
   }

   infoMap(){
	this.info = L.control();

	this.info.onAdd =  (map) => {
		this.info._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.getNameCity();
		return this.info._div;
	};
	
	this.info.addTo(this.map);
   
   }

   // method that we will use to update the control based on feature properties passed
   getNameCity(){
	this.info.update =  (props) => {
		this.info._div.innerHTML = '<h4>City :</h4>' +  (props.name ?
			'<b>' + props.name + '</b>' 
			: 'Hover over a state');
	};
   }

}
