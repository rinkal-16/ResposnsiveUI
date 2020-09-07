import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { 
    this.matIconRegistry.addSvgIcon(
      "assessment",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/assessment-24px.svg")
    );
  }

  ngOnInit(): void {
  }
}
