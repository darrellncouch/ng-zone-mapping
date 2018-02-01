import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { SelectOfficeService } from '../select-office.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  private apiURL = 'http://localhost:8000/';
  data: any = [{}];
  offices: any = [{}];
  zones: any = [{}];



  constructor(private http: Http, private selectOfficeService: SelectOfficeService) {
    this.getOffices()
  }

  const getOffices = async ()=>{
    const officeList = await this.http.get(`${this.apiURL}offices`)
      .map((res: Response) => res.json())
      officeList.subscribe(data => {
        this.offices = data
      })
  }

  ngOnInit() {

  }

  const getZones = async (e) =>{
    const zoneList = await this.http.get(`${this.apiURL}zones/${e}`)
      .map((res: Response) => res.json())
        zoneList.subscribe(data => {
          this.zones = data
        })
        for(let i = 0; i < this.offices.length; i++){
          if(e == this.offices[i].id){
            this.selectOfficeService.centerMap(this.offices[i].address);4
          }
        }
    }



  getOfficeInfo(e){
    this.getZones(e);
  }

}
