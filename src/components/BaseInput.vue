<template>
    <div class="form-field">
        <label :for="props.id" class="form-field__label">{{ props.title }}</label>
        <input :id="props.id" 
               class="form-field__input"
               :class="{error:formErrors[props.id]}" 
               :type="props.type"
               @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
               @keyup="$emit('keyup')"
               @blur="$emit('blur')"
        />
        <span class="form-field__error" v-if="formErrors[props.id]">{{ formErrors[props.id] }}</span>  <!--imported from utils-->
    </div>
</template>

<script setup lang="ts">
import { formErrors } from '../helpers/FormValidation'
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
    }
})
</script>

<style scoped lang="scss">
.form-field {
    margin: 5px 0 16px;

    &__input {
        width: 100%;
        height: 50px;
        padding: 6px;
    }

    &__error {
        font-size: 12px;
        color: #ff0000
    }
}

.error {
    border: 1px solid #ff0000;
    border-radius: 2px;
}
</style>