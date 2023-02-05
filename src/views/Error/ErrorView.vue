<template>
    <div class="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
        <span class="bigger-text">{{ errorCode }}</span>
        <span class="big-text">{{ errorText }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getRandomErrorMessage } from './errorMessages';
export default defineComponent({
    computed: {
        errorCode(): number {
            if(this.$route.params.code != null) {
                return parseInt(this.$route.params.code as string)
            }
            return (this.$route.meta.error as number) ?? 0;
        },
        errorText() {
            return getRandomErrorMessage(this.errorCode);
        }
    }
});
</script>

<style lang="scss" scoped>
.bigger-text {
    font-size: 5em;
}
.big-text {
    font-size: 2em;
}
</style>
  