<template>
    <form class="signin-form" @submit.prevent="'register'">
        <div class="signin-form__title">
            <h2>Регистрация</h2>
        </div>
        <IDField v-model="regData.id"/>
        <EmailField v-model="regData.email"/>
        <button class="submit-button"
                :class="{'disabled-button': isButtonDisabled}"
                :disabled="isButtonDisabled"
        >
        Зарегистрироваться
    </button>  
    </form>
</template>

<script setup lang="ts">
import useFormValidation from '@/helpers/FormValidation';
import useButtonState from '@/helpers/SubmitButtonState';
import { reactive } from 'vue';
import EmailField from './FormsFields/EmailField.vue';
import IDField from './FormsFields/IDField.vue';

const regData = reactive<{[key:string]:string}>({
    id: '',
    email: ''
})

const { errors } = useFormValidation()
const { isButtonDisabled } = useButtonState(regData, errors)

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