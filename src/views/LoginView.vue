<template>
  <div class="auth-page">
    <div class="auth-page__content">
      <div class="auth-page__formbox">
        <div class="auth-page__navigation">
          <button class="auth-page__navigation-item" :class="{'active-item': currentForm === SigninForm}" @click="currentForm=SigninForm">
            Вход 
          </button>
          <button class="auth-page__navigation-item" :class="{'active-item': currentForm === SignupForm}" @click="currentForm=SignupForm">
            Регистрация
          </button>
        </div>
        <component :is="currentForm"/>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import SigninForm from '@/components/SigninForm.vue';
import SignupForm from '@/components/SignupForm.vue';
import { shallowRef } from 'vue';

const currentForm = shallowRef(SigninForm)

</script>

<style scoped lang="scss">

.auth-page {
  @include flex-center;
  height: 100vh;

  &__content {
    max-width: 360px;
    width: 100%;
  }

  &__formbox {
    padding: 30px;
    box-shadow: $main-boxshadow;
    border-radius: 3px;
  }

  &__navigation {
    background: #f3f3f3;
    padding: 10px;
    border-radius: 30px;
  }

  &__navigation-item {
    position: relative;
    text-transform: uppercase;
    margin: 0 15px;
    background: none;
    border: none;
    font-size: 15px;
    font-weight: bold;

    &:after {
        content: '';
        width: 0;
      }
      &.active-item:after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        height: 4px;
        width: 100%;
        background: #000;
        transition: width 1s ease;
        border-radius: 6px;
      }

      &:hover {
        cursor: pointer;

        &:after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 4px;
          width: 100%;
          background: #ad0303;
          transition: width 1s ease;
          border-radius: 6px;
        }
      }
  }
}
</style>