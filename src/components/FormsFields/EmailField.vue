<template>
    <div class="form-fields">
        <label for="email" class="label-field">E-mail</label>
        <input id="email" 
               class="input-field" 
               :class="{error: errors.email}"
               type="text" 
               v-model="email"
               @keyup="emailValidation"
               @blur="emailValidation"
               @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <div class="error-field">{{errors.email}}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useFormValidation from '@/helpers/FormValidation'

const email = ref('')
const { emailFieldValidation, errors } = useFormValidation()
const emailValidation = () => {
    emailFieldValidation('email', 'E-mail', email.value)
}

</script>