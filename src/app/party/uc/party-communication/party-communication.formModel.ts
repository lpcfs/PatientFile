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

// https://github.com/udos86/ng-dynamic-forms#form-groups
export const MY_FORM_MODEL: DynamicFormControlModel[] = [
  new DynamicFormGroupModel({

    id: "email",
    legend: "email",

    group: [
      new DynamicInputModel(
        {
          id: "email",
          placeholder: "Email",
          maxLength: 150,
          validators: {
            required: null
          },
          errorMessages: {
            required: "{{ placeholder }} is verplicht"
          }
        },
        {
          element: {
            group: "1231"
          },
          grid: {
            control: "full-width",
            label: "col-sm-3"
          }
        }
      ),

    ]
  }
  ),
  new DynamicFormGroupModel({

    id: "phone",
    legend: "phone",

    group: [
      new DynamicInputModel(
        {
          id: "phone",
          placeholder: "Vaste Telefoon",
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
          id: "mobile_phone",
          placeholder: "GSM",
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
    ]
  }
  )

];
