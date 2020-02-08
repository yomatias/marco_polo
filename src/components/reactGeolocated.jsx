import React from 'react';
import { geolocated } from "react-geolocated";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './geolocated.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class ReactGeolocated extends React.Component {
  render() {

    let coords = null;
    if(this.props && this.props.coords) {
        coords = <div>
          <h1>React Geolocated</h1>
            <p>latitude -> { this.props.coords.latitude}</p>
            <p>longitude -> { this.props.coords.longitude}</p>
        </div>
    }


    let map = null;
    let position = [];
    if(this.props && this.props.coords) {
      position = [this.props.coords.latitude, this.props.coords.longitude ];
      map = <div>
        <h1>Leaflet</h1>
        <Map center={position} zoom={17}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={ position }>
            <Popup>Dude! <br />you're here!</Popup>
          </Marker>
        </Map>
      </div>
    }

    return(<div>
      { coords }
      { map }
    </div>);
  }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 0,
  })(ReactGeolocated);