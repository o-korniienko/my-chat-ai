import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import {LANGUAGES} from '../languages'
import {NzSpaceAlign } from 'ng-zorro-antd/space'
import {AIService } from '../service/ai.service'

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {

  constructor(private fb: UntypedFormBuilder, private aiService: AIService) {}
  languages: string[] = []
  inputValue = ""
  formGroup!: UntypedFormGroup;
  selectedLanguage = ""
  nzAlign: NzSpaceAlign  = "start"
  isLoad = false


  submitForm(){
    var text = this.formGroup.value.text
    var languageOption = this.formGroup.value.languageOption
    console.log(text)
    console.log(languageOption)
    if(text !== undefined && text !== ""){
       this.isLoad = true
       var responseText = ""
       var response = this.aiService.translate(text, languageOption)
       response.subscribe(res =>  {
          if(res !== undefined){
            responseText = res.choices[0].message.content
            console.log(responseText)
            this.inputValue = responseText
            this.isLoad = false
          }else{
            this.isLoad = false
          }
       })
    }
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      text: [null, [Validators.required]],
      languageOption: [null, [Validators.required]],
      translated: [null, null],
      remember: [true]
    });
    this.languages = LANGUAGES
    this.selectedLanguage = LANGUAGES[0]
  }
}
