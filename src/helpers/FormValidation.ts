import { reactive } from "vue";
import { isEmpty, minLength, maxLength, isLetterContain, isEmailValid } from "./FieldsValidation";

export const errors = reactive<{[key:string]:string}>({})

export default function useFormValidation() {

    const loginFieldValidation = (fieldID:string, fieldName:string, fieldValue:string) => {
        errors[fieldID] = !fieldValue ? isEmpty(fieldID, fieldName, fieldValue) : minLength(fieldID, fieldName, fieldValue, 4)
    }
    
    const passwordFieldValidation = (fieldID:string, fieldName:string, fieldValue: string) => {
        errors[fieldID] = !fieldValue ? isEmpty(fieldID, fieldName, fieldValue) : minLength(fieldID, fieldName, fieldValue, 4)
    }
    
    const idFieldValidation = (fieldID:string, fieldName:string,  fieldValue: string) => {
        errors[fieldID] = !fieldValue ? isEmpty(fieldID, fieldName, fieldValue) 
        : isLetterContain(fieldID, fieldName, fieldValue) 
        || minLength(fieldID, fieldName, fieldValue, 10) 
        || maxLength(fieldID, fieldName, fieldValue, 10)
    }
        
    const emailFieldValidation = (fieldID:string, fieldName:string,  fieldValue: string) => {
        errors[fieldID] = !fieldValue ? isEmpty(fieldID, fieldName, fieldValue) : isEmailValid(fieldValue) || minLength(fieldID, fieldName, fieldValue, 4) 
    }
    
    
    return { loginFieldValidation, passwordFieldValidation, idFieldValidation, emailFieldValidation, errors }
}