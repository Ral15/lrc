import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { NavBarPlayer } from '../navbar_player';
declare let Mixcloud: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  status: boolean;
  player: NavBarPlayer = {
    url: '/NTSRadio/autotune-the-world-w-christopher-kirkley-20th-december-2018/',
    widget: {},
    widgetObj: {},
    title: 'LARADIOCOSMICA.COM',
  };
  play: any;
  firstTime: boolean;

  @ViewChild('mixcloud') mixcloud: ElementRef;

  constructor() {  }

  ngOnInit() {
    this.status = this.isStreamOn()
    this.play = false;
    // this.player.url = '';
    this.player.widget = Mixcloud.PlayerWidget(this.mixcloud.nativeElement);
    this.player.widget.ready.then((widgetObj) => {
      this.player.widgetObj = widgetObj;
      return this.loadFake();
    });
  }

  // TODO
  isStreamOn(): boolean {
    return false
  }

  loadFake(): void {
    console.log('loadFake');
    this.player.widgetObj.load(this.player.url, false).then((o) => {
        console.log({o})
        this.player.title = `${o.player_info.owner}: ${o.player_info.title}`;
      }).catch((error) => {
        console.log(error)
      })
  }

  toggleWidget(): void {
    console.log('?')
    // this.player.widgetObj.play();
    this.play & this.player.widgetObj.pause() | this.player.widgetObj.play();
    this.play = !this.play;
  }





}



// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   lrc = this
//   // lrc.title = 'La Radio Cosmica'
//   status = 'OFFLINE'

//   @ViewChild('mixcloud') mixcloud: ElementRef;

//   constructor() {}


//   // ngOnInit() {}
//   ngAfterViewInit() {
//     // console.log('quien soy?')
//     // console.log(this.mixcloud.nativeElement);
//     // console.log(Mixcloud);
//     // this.mixcloud.nativeElement.ready
//     const widget = Mixcloud.PlayerWidget(this.mixcloud.nativeElement);
//     widget.mini = true;
//     widget.ready.then((obj) => {
//         // obj.mini = true;
//         console.log('entre?')
//         // console.log(obj)
//         return obj.load('/spartacus/lambiance/', true);
//     }).then((obj) => {
//         console.log(obj)
//     })
//     return;
//   }


//   // var widget = Mixcloud.PlayerWidget()

// }
