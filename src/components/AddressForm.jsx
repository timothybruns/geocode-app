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
    }

    getDrivingDistance() {
      fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.orgStreet}+${this.state.orgCity}+${this.state.orgState}+${this.state.orgZip}&destination=${this.state.destStreet}+${this.state.destCity}+${this.state.destState}+${this.state.destZip}&key=AIzaSyBzvPewFiIIxkEDuefEz9IpDtf-r77Lon4`)
      .then(res => res.json())
      .then((res) => {
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
              <select name="state" className="form-control" id="state" placeholder="State" value={this.state.state} onChange={this.handleChange}>
                <option value="">*State</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </select>
              <input type="text" pattern="[0-9]{5}" className="form-control" id="zip" placeholder="Zip" value={this.state.zip} onChange={this.handleChange} />
            </label>
          </form>
          <hr/>
          <form onSubmit={this.handleSubmit}>
          DESTINATION
            <label>
              <input type="street" className="form-control" id="destStreet" placeholder="Street" value={this.state.destStreet} onChange={this.handleChange} />
              <input type="city" className="form-control" id="destCity" placeholder="City" value={this.state.destCity} onChange={this.handleChange} />
              <select name="state" className="form-control" id="state" placeholder="State" value={this.state.state} onChange={this.handleChange}>
                <option value="">State</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </select>
              <input type="text" pattern="[0-9]{5}" className="form-control" id="zip" placeholder="Zip" value={this.state.zip} onChange={this.handleChange} />
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