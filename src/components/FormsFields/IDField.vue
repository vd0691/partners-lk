<template>
    <div class="form-fields">
        <label for="companyid" class="label-field">ИНН</label>
        <input id="companyid" 
               class="input-field" 
               :class="{error: errors.id}"
               type="text" 
               v-model="companyID" 
               @keyup="idValidation"
               @blur="idValidation"
               @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <div class="error-field">{{errors.id}}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useFormValidation from '@/helpers/FormValidation'

const companyID = ref('')
const { idFieldValidation, errors } = useFormValidation()
const idValidation = () => {
    idFieldValidation('id', 'ИНН', companyID.value)
}

</script>