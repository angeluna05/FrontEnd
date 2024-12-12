import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavService } from '../../../../services/nav.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  public language: boolean = false;

  public languages: any[] = [
  {
    language: 'Español',
    code: 'es',
    icon: 'es'
  },
  {
    language: 'Inglés',
    code: 'en',
    icon: 'us'
  }
]

  public selectedLanguage: any = {
    language: 'Español',
    code: 'es',
    icon: 'es'
  }

  constructor(public navServices: NavService, private translate: TranslateService) { }
  // 
  ngOnInit() {
  }

  changeLanguage(lang) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }

}
