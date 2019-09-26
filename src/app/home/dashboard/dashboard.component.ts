import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  finalJson: any = {};
  detailform: FormGroup;
  name: any;
  genid: 0;
  Allcontroller = [];
  jsoncontent = '';
  htmlcontent = '';

  dropdowntype: any = { id: 1, name: 'TextBox' };
  dropdownoption: [];
  selectTemplate: any;
  preTemplate: any;
  postTemplate: any;
  public selectTemplates = [
    {
      id: 1,
      name: 'Angular Material',
      preTemplate: `<mat-row>`,
      endTemplate: `</mat-row>`,
    },
    {
      id: 2,
      name: 'AdminLTE',
      preTemplate: `<div class="form-group">`,
      endTemplate: `</div>`,
    },
    { id: 3, name: 'HTML' },
    {
      id: 4,
      name: 'Bootstrap',
      preTemplate: `<div class="form-group">`,
      endTemplate: `</div>`,
    },
  ];
  public type = [
    { id: 1, name: 'TextBox' },
    { id: 2, name: 'DropDown' },
    { id: 3, name: 'TextArea' },
    { id: 4, name: 'CheckBox' },
    { id: 4, name: 'Radiobutton' },
  ];

  constructor(public formBuilder: FormBuilder) {
    this.detailform = this.formBuilder.group({
      type: [''],
      title: [''],
      value: [''],
      options: [''],
      directive: [''],
      model: [''],
      placeHolder: [''],
    });
  }

  test() {
    if (
      this.detailform.controls.title.value !== null &&
      this.detailform.controls.title.value !== undefined
    ) {
      const nameExist = this.Allcontroller.some(
        data => data.name === this.detailform.controls.title.value,
      );
      if (!nameExist) {
        this.genid++;
        const datacontroller = {
          name: this.detailform.controls.title.value,
          type: this.dropdowntype.name,
          options: [],
          value: this.detailform.controls.value.value,
          directive: this.detailform.controls.directive.value,
          model: this.detailform.controls.model.value,
          placeHolder: this.detailform.controls.placeHolder.value,
        };
        if (
          this.dropdowntype.name === 'DropDown' ||
          this.dropdowntype.name === 'Radiobutton'
        ) {
          datacontroller.options = this.detailform.controls.options.value.split(
            ',',
          );
        }
        this.Allcontroller.push(datacontroller);
        this.generateHTML();
        this.generateJSON();
        this.generatets();
      }
    }
  }

  generateBasicSetting() {
    this.finalJson = {
      templates: this.selectTemplate,
      preTemplate: this.preTemplate,
      postTemplate: this.postTemplate,
    };
  }
  generateJSON() {
    this.jsoncontent = JSON.stringify(this.Allcontroller, undefined, 4);
  }

  editJSON() {
    this.Allcontroller = JSON.parse(this.jsoncontent);
  }

  copyText() {
    let textarea = null;
    textarea = document.createElement('textarea');
    textarea.style.height = '0px';
    textarea.style.left = '-100px';
    textarea.style.opacity = '0';
    textarea.style.position = 'fixed';
    textarea.style.top = '-100px';
    textarea.style.width = '0px';
    document.body.appendChild(textarea);
    textarea.value = this.jsoncontent;
    textarea.select();
    const successful = document.execCommand('copy');
    if (successful) {
    } else {
    }
    if (textarea && textarea.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }
  }

  generatets() {
    let tscode = `import { FormBuilder, FormGroup } from '@angular/forms';
        //in class
        detailform: FormGroup;
        // in constructure:-
        constructor(public formBuilder: FormBuilder) {
          this.detailform = this.formBuilder.group({`;

    this.Allcontroller.forEach(controller => {
      tscode += `${controller.name} : [''],`;
    });
    tscode.substring(0, tscode.length - 1);
    tscode += `});
        }`;
  }

  generateHTML() {
    let html = `<form>`;
    html += this.selectTemplate
      ? this.selectTemplate.id === 2
        ? `<div class="box-body col-lg-12">`
        : ''
      : '';
    this.Allcontroller.forEach(controller => {
      if (controller.type === 'TextBox') {
        html += this.preTemplate ? this.preTemplate : '';
        html =
          html +
          `<div> <label>${controller.name}:</label>
        <input class="form-control" directive [id]=""  placeholder="${controller.placeHolder}"
          value="${controller.value}"  [type]="${controller.type}"> </div>`;
        html += this.postTemplate ? this.postTemplate : '';
      } else if (controller.type === 'DropDown') {
        html += this.preTemplate ? this.preTemplate : '';

        html =
          html +
          `<div><label>${controller.name}:</label>
          <select [id]="dropdowntype" class="form-control"  >`;
        controller.options.forEach(option => {
          html = html + `<option   [value]="${option}">${option}</option>`;
        });
        html = html + `</select>  </div>`;
        html += this.postTemplate ? this.postTemplate : '';
      } else if (controller.type === 'TextArea') {
        html += this.preTemplate ? this.preTemplate : '';

        html =
          html +
          `<div>
        <label>${controller.name}:</label>
        <textarea placeholder="${controller.placeHolder}" class="form-control">
            ${controller.value}
            </textarea>
        </div>`;
        html += this.postTemplate ? this.postTemplate : '';
      } else if (controller.type === 'CheckBox') {
        html += this.preTemplate ? this.preTemplate : '';

        html =
          html +
          `<div>
        <label>${controller.name}:</label>
        <input type="checkbox" name="${controller.value}"> ${controller.name}<br>
        </div>`;
        html += this.postTemplate ? this.postTemplate : '';
      } else if (controller.type === 'Radiobutton') {
        html += this.preTemplate ? this.preTemplate : '';

        html =
          html +
          `<div>
        <label>${controller.name}:</label>`;
        controller.options.forEach(option => {
          html =
            html +
            `<input type="radio" name="${controller.name}"> ${option}<br>`;
        });
        html =
          html +
          `<input type="checkbox" name="${controller.value}"> ${controller.name}<br>
        </div>`;
        html += this.postTemplate ? this.postTemplate : '';
      }
    });
    html += this.selectTemplate
      ? this.selectTemplate.id === 2
        ? ` </div>`
        : ''
      : '';

    html = html + `</form>`;
    // console.log('html', html);
  }
}
