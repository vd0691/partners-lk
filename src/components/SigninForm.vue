<template>
    <div class="login-form">
        <AppForm title="Форма авторизации" @submit.prevent="login">
            <BaseInput title="Логин" id="login" v-model="loginData.login" @blur="loginValidate" @keyup="loginValidate" />
            <BaseInput title="Пароль" id="password" v-model="loginData.password" type="password" />
            <span class="error login-form__error">
                {{ store.state.error.message }}
            </span>
            <BaseButton text="Войти" class="login-form__button" :disabled="isButtonDisabled" />
        </AppForm>
    </div>
</template>

<script setup lang="ts">
import useFormValidation from '@/helpers/FormValidation'
import useButtonState from '@/helpers/SubmitButtonState'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { formErrors } from '../helpers/FormValidation'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'
import AppForm from './AppForm.vue'


const store = useStore()
const { loginFieldValidation } = useFormValidation()
const loginData = reactive({
    login: '',
    password: ''
})
const isButtonDisabled = useButtonState(loginData, formErrors)
const login = () => {
    store.dispatch('LOGIN', loginData)
}
const loginValidate = () => {
    loginFieldValidation('login', 'логин', loginData.login)
}

</script>

<style scoped lang="scss">
.login-form {

    &__button {
        font-size: 16px;
        line-height: 20px;
        padding: 16px 24px;
        width: 100%;
        margin-top: 20px;
    }
}
</style>