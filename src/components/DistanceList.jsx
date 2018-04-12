import React from 'react';

const DistanceList = (props) => {
    console.log(props)
    return (
        <div className='distanceList'>
            <h4>{props.orgAddress.formatted_address} is {props.distance} miles away from {props.destAddress.formatted_address}</h4>
            <h4>The drive will take approximately {props.drivingDistance}!</h4>
            <br/>
        </div>
    )
}


export default DistanceList;