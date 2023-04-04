<template>
    <div class="contractor">
        <select name="contractor" 
            @change="changeContractor(($event.target as HTMLSelectElement).value)"
        >
            <option>Выберите контрагента</option>
            <option v-for="contractor in contractors" 
                    :value="contractor.id" 
                    :key="contractor.id"
                    :selected="currentContractor.id === contractor.id"
            > 
                {{ contractor.name }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const contractors = computed(() => store.state.contractors.contractors)
const currentContractor = computed(() => store.state.contractors.contractor)

const changeContractor = (id:string) => {
    store.dispatch('SET_CURRENT_CONTRACTOR', id)
}

</script>