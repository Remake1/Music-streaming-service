<script setup>

</script>

<template>
<div class="bar mt-4">
    <div class="flex">
      <div class="mx-8">
        <svg fill="none" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="#a2a2a2"><path d="m15.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="m3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2-2zm16 0h-14v7.92l3.375-2.7a1 1 0 0 1 1.25 0l4.3 3.44 1.368-1.367a1 1 0 0 1 1.414 0l2.293 2.293zm-14 14h14v-1.586l-3-3-1.293 1.293a1 1 0 0 1 -1.332.074l-4.375-3.501-4 3.2z"/></g></svg>
      </div>
      <div>
        <div class="vl"></div>
      </div>
      <div class="ml-8">
        {{ $t('label_text') }}
      </div>
    </div>
    <div class="flex">
      <div class="mr-40">
        {{ $t('label_artist') }}
      </div>
      <div>
        <div class="vl"></div>
      </div>
      <div class="mx-8">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#a2a2a2" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-6a1 1 0 0 1 1 1v4.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V7a1 1 0 0 1 1-1z" fill="#a2a2a2"/></svg>
      </div>
    </div>
</div>
</template>

<style scoped>
.bar{
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.vl{
  border-left: 3px solid #a2a2a2;
  height: 32px;
}
* {
  color: #a2a2a2;
/*text size 32px*/
  font-size: 20px;
}
</style>