import React, { Component } from 'react';
import DistanceList from './DistanceList'

var haversine = require('haversine-distance');

class AddressForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        orgStreet: '',
        orgCity: '',
        orgState: '',
        orgZip: '',
        destStreet: '',
        destCity: '',
        destState: '',
        destZip: '',
        orgAddress: null,
        destAddress: null,
        distance: null,
        drivingDistance: null,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange = (event) => {
      const prop =  event.target.id;
      this.setState({[prop]: event.target.value});
    }

    handleSubmit(event, address) {
      event.preventDefault();
      this.getOriginAddress();
      this.getDistance();
      this.getDrivingDistance();
      this.setState({
        orgStreet: '',
        orgCity: '',
        orgState: '',
        orgZip: '',
        destStreet: '',
        destCity: '',
        destState: '',
        destZip: '',
      })
    }

    getOriginAddress() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.orgStreet}+${this.state.orgCity}+${this.state.orgState}+${this.state.orgZip}&key=AIzaSyAxZ6FXNZnH1DbkPI2UIuMvb_yEb8CiuHE`)
    .then(res => res.json())
      .then((res) => {
        this.setState({
          orgAddress: res.results[0],
          apiDataLoaded: true,
        });
      })
      .catch(err => console.log(err));
  }

    getDistance() {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.destStreet}+${this.state.destCity}+${this.state.destState}+${this.state.destZip}&key=AIzaSyAxZ6FXNZnH1DbkPI2UIuMvb_yEb8CiuHE`)
      .then(res => res.json())
      .then((res) => {
        var destLat = res.results[0].geometry.location.lat
        var destLng = res.results[0].geometry.location.lng
        var destLocation = {latitude: destLat, longitude: destLng}
        var orgLat = this.state.orgAddress.geometry.location.lat
        var orgLng = this.state.orgAddress.geometry.location.lng
        var orgLocation = {latitude: orgLat, longitude: orgLng }
        this.setState({
          destAddress: res.results[0],
          distance: Math.round(haversine(destLocation, orgLocation)* 0.00062137,2)
        });
      })
      .catch(err => console.log(err));
      if (this.state.destState === 'HI') {
        alert('No driving to Hawaii my friend!')
        window.location.reload();
      }
    }

    getDrivingDistance() {
      fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.orgStreet}+${this.state.orgCity}+${this.state.orgState}+${this.state.orgZip}&destination=${this.state.destStreet}+${this.state.destCity}+${this.state.destState}+${this.state.destZip}&key=AIzaSyBzvPewFiIIxkEDuefEz9IpDtf-r77Lon4`)
      .then(res => res.json())
      .then((res) => {
        // console.log(res.routes[0].legs[0].steps)
        this.setState({
          drivingDistance: res.routes[0].legs[0].duration.text
        });
      })
      .catch(err => console.log(err));
    }
    

    render() { 
      return (
        <div className="addressSearch">
        <br/>
          <form>
            ORIGIN
            <label>
              <input type="street" className="form-control" id="orgStreet" placeholder="Street" value={this.state.orgStreet} onChange={this.handleChange} />
              <input type="city" className="form-control" id="orgCity" placeholder="City" value={this.state.orgCity} onChange={this.handleChange} />
              <input type="state" className="form-control" id="orgState" placeholder="State" value={this.state.orgState} onChange={this.handleChange} />
              <input type="zip" pattern="[0-9]{5}" className="form-control" id="orgZip" placeholder="Zip" value={this.state.orgZip} onChange={this.handleChange} />
            </label>
          </form>
          <hr/>
          <form onSubmit={this.handleSubmit}>
          DESTINATION
            <label>
              <input type="street" className="form-control" id="destStreet" placeholder="Street" value={this.state.destStreet} onChange={this.handleChange} />
              <input type="city" className="form-control" id="destCity" placeholder="City" value={this.state.destCity} onChange={this.handleChange} />
              <input type="state" className="form-control" id="destState" placeholder="State" value={this.state.destState} onChange={this.handleChange} />
              <input type="zip" pattern="[0-9]{5}" className="form-control" id="destZip" placeholder="Zip" value={this.state.destZip} onChange={this.handleChange} />
            </label>
            <input type="submit" className="form-control" value="Submit" />
            <br/>
            <br/>
          </form>
          <div className="distanceList">
          {this.state.distance && this.state.drivingDistance !== null ?
              (<DistanceList 
                distance = {this.state.distance}
                drivingDistance = {this.state.drivingDistance}
                orgAddress = {this.state.orgAddress}
                destAddress = {this.state.destAddress}
              /> ) : (
                <p></p>
              )}
          </div>
        </div>
      );
    }
  }

  export default AddressForm;