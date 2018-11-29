import {
    DynamicFormControlModel,
    DynamicInputModel,
    DynamicCheckboxModel,
    DynamicTextAreaModel
} from "@ng-dynamic-forms/core";

export const FORM_MODEL: DynamicFormControlModel[] = [
    new DynamicInputModel({
        id: "title",
        label: "Title",
        maxLength: 200,
        placeholder: "Title",
        validators: {
            required: null
        }
    }),
    new DynamicTextAreaModel({
        id: "header",
        label: "Header",
        maxLength: 500,
        placeholder: "Header"
    }),
    new DynamicTextAreaModel({
        id: "content",
        label: "Content",
        placeholder: "Header",
        validators: {
            required: null
        }
    }),
    new DynamicTextAreaModel({
        id: "footer",
        label: "Footer",
        maxLength: 500,
        placeholder: "Footer"
    }),
    // new DynamicCheckboxModel({
    //     id: "personal",
    //     label: "Personal"
    // })
];

export let FORM_LAYOUT = {
    "content": {
        "element": {
            "container": "input-element-container",
            "control": "input-element-control",
            "errors": "input-element-errors",
            "group": "input-element-group",
            "hint": "input-element-hint",
            "host": "input-element-host",
            "label": "input-element-label",
            "option": "input-element-option"
        },
        "grid": {
            "container": "input-grid-container",
            "control": "input-grid-control",
            "errors": "input-grid-errors",
            "group": "input-grid-group",
            "hint": "input-grid-hint",
            "host": "input-grid-host",
            "label": "input-grid-label no",
            "option": "input-grid-option"
        }
    }
};
