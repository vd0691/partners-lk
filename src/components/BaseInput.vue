<template>
    <div class="field">
        <label :for="props.id" class="form-field__label" v-if="props.title">{{ props.title }}</label>
        <input :id="props.id" 
               class="field__input"
               :class="{error:formErrors[props.id]}" 
               :type="props.type"
               :placeholder="props.placeholder"
               @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
               @keyup="$emit('keyup')"
               @blur="$emit('blur')"
        />
        <span class="form-field__error" v-if="formErrors[props.id]">{{ formErrors[props.id] }}</span>
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
        default: ''    
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    }
})
</script>

<style scoped lang="scss">
.field {
    margin: 5px 0 16px;

    &__input {
        width: 100%;
        height: 30px;
        padding: 6px;
        text-align: center;
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