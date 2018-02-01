import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SelectOfficeService {

  constructor(private http: Http) { }

  coordinates: object = {
    latitude : 33.4081504,
    longitude : -111.8044479
  }


  centerMap(address){
    const getCoords = async (address)=>{
      const coords = await this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBPM590byZIlUBoDC3Nq5E9yxTEFdT1gH8`)
        .map((res: Response) => res.json())
      coords.subscribe(data => {
        this.coordinates.latitude = data.results[0].geometry.location.lat;
        this.coordinates.longitude = data.results[0].geometry.location.lng;
        console.log(data.results[0].geometry.location.lat);
        console.log(data.results[0].geometry.location.lng);
      })

    }
    getCoords(address)

  }
}
