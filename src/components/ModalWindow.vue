<template>
    <div class="modal" @click.self="$emit('closeWindow')">
        <div class="modal__content">
            <div class="closeBtn" @click="$emit('closeWindow')">
                <svg data-v-716ea81c="" width="16" height="16" viewBox="0 0 14 14" fill="#667585" xmlns="http://www.w3.org/2000/svg"><path d="M.305.292a.999.999 0 011.413 0L6.006 4.58 10.295.292a.999.999 0 011.412 1.413L7.42 5.994l4.287 4.288a1 1 0 01.083 1.32l-.082.093a.999.999 0 01-1.413 0L6.006 7.407l-4.288 4.288a1 1 0 11-1.413-1.413l4.288-4.288L.305 1.705A.999.999 0 01.222.386L.305.292z"></path></svg>
            </div>
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,.5);

    &__content {
        position: relative;
        width: 900px;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        
        @media screen and (max-width: 1024px) {
            width: 80%;
        }
    }
}

.closeBtn {
    position: absolute;
    cursor: pointer;
    top: 14px;
    right: 16px;
}
</style>

