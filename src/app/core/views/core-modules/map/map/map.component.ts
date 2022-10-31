import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/shared/services/map/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MapComponent implements OnInit, AfterViewInit {

  // set map coordinate
  lat = 6.448727;
  lng = 3.576916;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  map!: google.maps.Map;

  //set map options
  mapOptions: google.maps.MapOptions = {};

  isLoadingLayer:boolean = false;

  timeOfTheDay = new Date().getHours();

  // Create a new StyledMapType object, passing it an array of styles,
  // and the name to be displayed on the map type control.
  nightMapStyle = new google.maps.StyledMapType(
    [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
      },
    ],
    { name: 'Night' }
  );

  constructor(
    public mapService:MapService
  ) { }

  ngOnInit(): void {

    // update map options
    this.mapOptions = {
      // streetView: this.panorama,
      center: this.coordinates,
      zoom: 8,
      streetViewControl: true,
      streetViewControlOptions: {
        // position: google.maps.ControlPosition.LEFT_TOP,
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ['hybrid', 'roadmap', 'satellite', 'terrain', 'night_mode'],
        // position: google.maps.ControlPosition.BOTTOM_RIGHT,
        // style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      },
    };
  }

  // Initialize google map
  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = new google.maps.Map( document.getElementById("map") as HTMLElement, this.mapOptions);

    //Associate the styled map with the MapTypeId and set it to display base on time of the day.
    this.map.mapTypes.set('night_mode', this.nightMapStyle);
    // if the time is 3pm or more than 3pm display night mode
    if (this.timeOfTheDay >= 15) {
      this.map.setMapTypeId('night_mode');
    } else {
      this.map.setMapTypeId('roadmap');
    }

    const transitLayer = new google.maps.TransitLayer();

    transitLayer.setMap(this.map);
  }

  getTerminalLayer(e: any){
    console.log(e)
    this.getLayersTypes('terminal')
  }

  getLayersTypes(layer: string){

    this.isLoadingLayer = true;
      this.mapService.fetchMapLayers(layer).subscribe((res: any) => {
        console.log(res)
        this.isLoadingLayer = false;
        try {
          this.addLayerToMap(res, layer, '#fff');
        } catch (e) {
          console.log(e, 'Not a GeoJSON file!');
        }
        this.zoom(this.map);

      },(error:any)=> this.isLoadingLayer = false);
  }


  /*******************************************
   * method to process and add layer to map. *
   ******************************************/
   private addLayerToMap(res: any, projectId: string, layerColor: string) {
    const geojson = res as any;

    //  add geoJson data to map
    this.map.data.addGeoJson(geojson);

    // this.projectLayers[projectId] = geojson;

    // Style map layers
    // this.map.data.setStyle((feature) => {
    //   if (this.arrayOfId.length <= 1) {
    //     if (feature.getProperty('agent_color')) {
    //       layerColor = feature.getProperty('agent_color');
    //     }
    //   }
    //   let features = feature.getProperty('project');
    //   if (features === projectId) {
    //     return /** @type {!google.maps.Data.StyleOptions} */ {
    //       icon: {
    //         path: google.maps.SymbolPath.CIRCLE,
    //         fillColor: layerColor,
    //         fillOpacity: 0.8,
    //         strokeColor: 'white',
    //         strokeWeight: 0.5,
    //         scale: 7,
    //       },
    //       fillColor: layerColor,
    //       strokeColor: layerColor,
    //       fillOpacity: 0.1,
    //       strokeWeight: 2,
    //     };
    //   }
    //   return {
    //     icon: {
    //       path: google.maps.SymbolPath.CIRCLE,
    //       fillColor: this.proCol[features],
    //       fillOpacity: 0.8,
    //       strokeColor: 'white',
    //       strokeWeight: 0.5,
    //       scale: 7,
    //     },
    //     fillColor: this.proCol[features],
    //     strokeColor: this.proCol[features],
    //     fillOpacity: 0.1,
    //     strokeWeight: 2,
    //   };
    // });

    // // Set click event for each layer features.
    // this.map.data.addListener('click', (event) => {
    //   console.log(event, 'from click');
    //   // open infoWindow
    //   this.createInfoWindow(event);
    //   // open street view
    //   this.openStreetView(event);
    // });
  }


  /*************************************************************
   * Update a map's viewport to fit each geometry in a dataset *
   *************************************************************/
   private zoom(map: google.maps.Map) {
    const bounds = new google.maps.LatLngBounds();

    map.data.forEach((feature) => {

      let geometry: any = feature.getGeometry();
      // for single data zoom
      // if (this.dataId && this.arrayOfId.length <= 1) {
      //   const dataId = feature.getProperty('id');
      //   if (this.dataId === dataId) {
      //     if (geometry) {
      //       this.processPoints(geometry, bounds.extend, bounds);
      //     }
      //   }
      // } else {
      if (geometry) {
          this.processPoints(geometry, bounds.extend, bounds);
       }
      // }
    });
    map.fitBounds(bounds);
  }

  /********************************************************************************
   * Process each point in a Geometry, regardless of how deep the points may lie. *
   ********************************************************************************/
  private processPoints(
    geometry: google.maps.LatLng | google.maps.Data.Geometry,
    callback: any,
    thisArg: google.maps.LatLngBounds
  ) {
    if (geometry instanceof google.maps.LatLng) {
      callback.call(thisArg, geometry);
    } else if (geometry instanceof google.maps.Data.Point) {
      callback.call(thisArg, geometry.get());
    } else {
      // @ts-ignore
      geometry.getArray().forEach((g) => {
        this.processPoints(g, callback, thisArg);
      });
    }
  }


}
