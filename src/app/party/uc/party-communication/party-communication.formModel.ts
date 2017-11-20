import {
    DynamicFormControlModel, DynamicFormService,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicFormGroupModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel,
    DynamicCheckboxGroupModel,
    DynamicDatePickerModel,
    DynamicSelectModel
  } from "@ng-dynamic-forms/core";
  
  export const MY_FORM_MODEL: DynamicFormControlModel[] = [
  
    new DynamicInputModel(
      {
        id: "email",
        placeholder: "Email",
        validators: {
          required: null
        },
        errorMessages: {
          required: "{{ placeholder }} is verplicht"
        }
      }
    ),
    new DynamicInputModel(
      {
        id: "phone",
        placeholder: "Telefoon",
        validators: {
          required: null
        },
        errorMessages: {
          required: "{{ placeholder }} is verplicht"
        }
      }
    ),
    new DynamicInputModel(
      {
        id: "phoneEmengency",
        placeholder: "Telefoon bij noodgevallen",
        validators: {
        }
      }
    )
  
  ];
  