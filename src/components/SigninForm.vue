<template>
    <form class="signin-form" @submit.prevent="login">
        <div class="signin-form__title">
            <h2>Вход в личный кабинет</h2>
        </div>
            <UsernameField v-model="user.username"/>
            <PasswordField v-model="user.password"/>                        
            <button class="submit-button"
                :class="{'disabled-button': isButtonDisabled}"
                :disabled="isButtonDisabled"
            >
              Войти
            </button> 
            <div class="alert-field">
               {{store.state.error.message}} 
            </div>
    </form>
    
</template>

<script setup lang="ts">
import useFormValidation from '@/helpers/FormValidation';
import useButtonState from '@/helpers/SubmitButtonState';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import PasswordField from './FormsFields/PasswordField.vue';
import UsernameField from './FormsFields/UsernameField.vue';

const store = useStore()
const user = reactive<{[key:string]:string}>({
    username: '',
    password: ''
})

const login = () => {
    store.dispatch('login', user)
}

const { errors } = useFormValidation()
const { isButtonDisabled } = useButtonState(user, errors)


</script>

<style scoped lang="scss">
.signin-form {

    &__field {
        margin: 0 0 20px;
        text-align: left;
        font-size: 14px;
    }
}


</style>