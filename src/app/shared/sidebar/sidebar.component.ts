import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { LoginService } from '../services/auth/login.service';
import * as jqueryProxy from "jquery";
declare var $: any;
const jquery: JQueryStatic = (jqueryProxy as any).default || jqueryProxy;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
menuItems: any[];
userPortal: any[];
  menuPadre:any[];
  userInfo;
  constructor(private sidebarService: SidebarService, private router: Router, public loginservice: LoginService) { 
     this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
    this.menuservice();
  }

  menuservice(){
    this.loginservice.getUserLogged().subscribe((user) => {
      this.userPortal = user['menuPortal'];
      this.userInfo = user['usuario'];

     
      // this.userPortal.map((menu) => {
      //   if(menu.grupo == 0) {
      //     menu.hijos = this.userPortal.filter((item) => item.grupo == menu.idMenuPortal);
      //   }
      // })

      // const valued = this.userPortal.filter(x => x.grupo == 0)

      // this.menuItems = valued;
     
    });

  }



  anchorClicked(event: MouseEvent): void {
    const target = event.srcElement["id"];
    if (target) {
      const $li = jquery("#" + target.replace("chevron", "li")).parent();

      if ($li.is(".active")) {

        $li.removeClass("active active-sm");
        jquery("ul:first", $li).slideUp(function () { });

      } else {

        // prevent closing menu if we are on child menu
        if (!$li.parent().is(".child_menu")) {
          jquery("#sidebar-menu").find("li").removeClass("active active-sm");
          jquery("#sidebar-menu").find("li ul").slideUp();
        }

        $li.addClass("active");

        jquery("ul:first", $li).slideDown(function () { });
      }
    }
  }

}
