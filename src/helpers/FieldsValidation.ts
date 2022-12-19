
export const isEmpty = (fieldID:string, fieldName:string, fieldValue:string) => {
    return !fieldValue ? `${fieldName} не может быть пустым` : ''
}

export const minLength = (fieldID:string, fieldName:string, fieldValue:string, minLength:number) => {
    return fieldValue.length < minLength ? `${fieldName} не может быть менее ${minLength} символов` : '' 
}

export const maxLength = (fieldID:string, fieldName:string, fieldValue:string, maxLength:number) => {
    return fieldValue.length > maxLength ? `${fieldName} не может превышать ${maxLength} символов` : '' 
}

export const isLetterContain = (fieldID:string, fieldName:string, fieldValue:string ) => {
    const re = /[^\d]/g;
    return re.test(fieldValue) ? `${fieldName} может содержать только цифры` : ''
}

export const isEmailValid = (fieldValue:string) => {
    const re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return !re.test(fieldValue) ? 'Вы ввели некорректный E-mail' : ''
}