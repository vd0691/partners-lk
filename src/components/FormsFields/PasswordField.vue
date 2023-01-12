<template>
    <div class="form-fields">
        <label for="password" class="label-field">Пароль</label>
        <input id="password" 
               class="input-field" 
               :class="{error: errors.password}"
               type="password"
               v-model="password"
               @keyup="passwordValidation"
               @blur="passwordValidation"
               @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <div class="error-field">{{errors.password}}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useFormValidation from '@/helpers/FormValidation'

const password = ref('')
const { passwordFieldValidation, errors } = useFormValidation()
const passwordValidation = () => {
    passwordFieldValidation('password', 'Пароль', password.value)
}

</script>