import { computed } from "vue";

export default function useButtonState(data:{[key:string]:string}, errors:{[key:string]:string}) {

    const isButtonDisabled = computed(() => {
        let disabled = true;
        for (const i in data) {
            if (!data[i] || errors[i]) {
                disabled = true;
                break;
            }
            disabled = false;
        }
        return disabled
    });

    return { isButtonDisabled }
}