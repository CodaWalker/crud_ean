import {Component, NgModule} from '@angular/core';
import { Router} from '@angular/router';

@NgModule({})
@Component({
  selector: 'wfm-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent{


  constructor(private router: Router){


  }
  ngOnInit() {

    setTimeout(() => {
      this.router.navigateByUrl('/', {replaceUrl: true});
    }, 10000);  //5s


  }

}

