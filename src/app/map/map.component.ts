import { Component, OnInit } from '@angular/core';

//side components
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { SelectOfficeService } from '../select-office.service';

import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private apiURL = 'http://localhost:8000/';
  data: any = [];
  offices: any = [];
  zones: any = [];
  customers: any [];
  filteredCustomers:any = [];
  filter: any = [{
    is_active : true,
    zones : []
  }];
  coordsArr: any = [];
  colorArr:string = [

    '#2196f3','#b6efa7','#9c27b0',
    '#18ffff','#4caf50','#ffeb3b',
    '#f44336','#000000','#bfb0f0',
    '#ff9800','#e64a19','#212121',
    '#795548','#f50057','#0d47a1',
    '#03a9f4','#009688','#b73768',
    '#cddc39','#1b5e20','#827717',
    '#76ff03','#e91e63','#607d8b',
    '#e242f4','#320ea5','#37b2ac'
  ];
  posibleServices:int ;
  dueForService:int;
  holdInfoForTable:any = [];
  tmpTotalCust:int = 0;
  tmpDueForService: int = 0;



  //MapComponent
  latitude: number = 33.4081504;
  longitude: number = -111.8044479;

  setLat(newLat){
    this.latitude = newLat;
  }

  setLng(newLng){
    this.longitude = newLng;
  }

  getOfficeInfo(e){
    this.getZones(e);
    this.getCustomers(e);
    this.getProjectionInfo();
  }

  constructor(private http: Http, private selectOfficeService: SelectOfficeService) {

    //SideMenuComponent
    this.getOffices()

   }

  ngOnInit() {
  }

  //SideMenuComponent
  const getOffices = async ()=>{
    const officeList = await this.http.get(`${this.apiURL}offices`)
      .map((res: Response) => res.json())
      officeList.subscribe(data => {
        this.offices = data
      })
  }

  centerMap(address){
    this.coordsArr = [];
    const getCoords = async (address)=>{
      const coords = await this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBPM590byZIlUBoDC3Nq5E9yxTEFdT1gH8`)
        .map((res: Response) => res.json())
      coords.subscribe(data => {
        this.latitude = data.results[0].geometry.location.lat;
        this.longitude = data.results[0].geometry.location.lng;
      })

    }
    getCoords(address)

  }

  const getZones = async (e) =>{
    const zoneList = await this.http.get(`${this.apiURL}zones/${e}`)
      .map((res: Response) => res.json())
        zoneList.subscribe(data => {
          this.zones = data
        })
        for(let i = 0; i < this.offices.length; i++){
          if(e == this.offices[i].id){
            this.centerMap(this.offices[i].address);
          }
        }
    }

  const getCustomers = async (e)=>{
    const customerList = await this.http.get(`${this.apiURL}customers/${e}`)
      .map((res: Response) => res.json())
    customerList.subscribe(data => {
      this.customers = data
    })

  }

  getProjectionInfo(){

    this.tmpTotalCust = 20;
    this.tmpDueForService = Math.floor((Math.random() * 20) + 1);

    console.log(this.tmpTotalCust, this.tmpDueForService)

      for(let i = 0; i < this.zones.length; i++){
        this.holdInfoForTable.push({
          zone_id: zone[i].id,
          zone: zone[i].zone,
          totalCustomers: this.tmpTotalCust,
          due_for_service: this.tmpDueForService
        })
      }
    console.log(this.holdInfoForTable)
  }

  statusFilter(e){
    if(e == 'active' ){
      this.filter.is_active = true;
    }else if(e == 'terminated'){
      this.filter.is_active = false;
    }else{
      this.filter.is_active = null;
    }
  }

  zoneFilter(val, e){
    if(this.filter.zones == undefined){
      this.filter.zones = [parseInt(val)];
    }else{
      for(let i = 0; i < this.filter.zones.length; i++){
        if(val == this.filter.zones[i]){
          this.filter.zones.splice(i, 1);
          return;
        }
      }
      this.filter.zones.push(parseInt(val));
    }
  }

  handleSubmit(e){
    //clear loc data
    // [1, 2]
    this.filteredCustomers = this.filter.zones.map(zone => {
      return this.customers.filter(cust => {
        return cust.zone_id == zone
      })
    })




    const getMarkers = async (arr)=>{
      this.coordsArr = [];
      for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
          const coords = await this.http.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=
              ${arr[i][j].address},
              ${arr[i][j].city},
              ${arr[i][j].state}
              ${arr[i][j].zip_code}
            &key=AIzaSyBPM590byZIlUBoDC3Nq5E9yxTEFdT1gH8`)
            .map((res: Response) => res.json())
          coords.subscribe(data => {
            var zoneName:string = this.zones.filter(item => {
              if(item.id == arr[i][j].zone_id){
                return item.zone;
              };
            })
            this.coordsArr.push({
              customer: arr[i][j].id,
              first_name: arr[i][j].first_name,
              last_name: arr[i][j].last_name,
              address: arr[i][j].address,
              city: arr[i][j].city,
              state: arr[i][j].state,
              zip_code: arr[i][j].zip_code,
              zone_id: arr[i][j].zone_id,
              zone: this.zoneName,
              service_week: arr[i][j].service_week,
              latitude: data.results[0].geometry.location.lat,
              longitude: data.results[0].geometry.location.lng
            })
          })
        }
      }


    }
    getMarkers(this.filteredCustomers)

  }

  handleUpdate(e){
    console.log(e)
    this.coordsArr = [];

    // this.http.post(`${this.apiURL}customer/${id}`, e.target)
  }
}
