import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  API_Key:string  = '69df5635b8d9b9b6c1ddf9ee1ec2f1a2' ;
  url:string = 'http://battuta.medunes.net/api/city/fr/search/?region=pa&key={'+ this.API_Key +'}';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.url).subscribe(data => {
      console.log("data: " +data);
    });
  }

}
