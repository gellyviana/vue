<template>
    <img  v-meu-transform:scale.animate="1.2" class="imagem-responsiva" :src="url" :alt="titulo">
</template>

<script>

export default {

    props:['url', 'titulo']
}

</script>

<style scoped>

 .imagem-responsiva{
    width: 100%;
  }

</style>