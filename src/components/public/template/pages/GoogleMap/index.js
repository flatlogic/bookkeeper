import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const styles = theme => ({
  mapContainer: {
    height: "100%",
  },
  vectorContainer: {
    margin: -theme.spacing(3)
  }
})



function Maps({ classes }) {
  return (
    <div className={classes.mapContainer}>
      <LoadScript googleMapsApiKey="AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg">
        <GoogleMap mapContainerStyle={{ height: '100%', width: '100%' }} zoom={12}
          center={{ lat: -37.813179, lng: 144.950259 }}>
          <Marker position={{ lat: -37.813179, lng: 144.950259 }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}


export default withStyles(styles)(Maps);