<template>
    <div class="form-fields">
        <label for="username" class="label-field">Логин</label>
        <input id="username" 
               class="input-field" 
               :class="{error: errors.username}"
               v-model="username"
               @keyup="loginValidation"
               @blur="loginValidation"
               @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <div class="error-field">{{errors.username}}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useFormValidation from '@/helpers/FormValidation'

const username = ref('')
const { loginFieldValidation, errors } = useFormValidation()
const loginValidation = () => {
    loginFieldValidation('username', 'Логин', username.value)
}

</script>