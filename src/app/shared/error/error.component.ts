import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
   errorOccured=""
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.params['msg']){
      this.errorOccured=this.route.snapshot.params['msg'];
    }else{
      this.errorOccured="Some error has occuured";
    }
  }

}
