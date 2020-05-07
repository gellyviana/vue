<template>
  <div class="corpo">
    <h1 class="titulo-centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="titulo-centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Filtre pelo nome da foto">
    <ul class="lista-fotos">
      <li class="lista-fotos-itens" v-for="foto of fotosComFiltro" v-bind:key="foto.id">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo"/>
          <meu-botao rotulo="remover" 
                tipo="button" 
                :confirmacao="false" 
                @botaoAtivado="remover(foto)"
                estilo="padrao"/>
        </meu-painel>
      </li>
    </ul>

  </div>
</template>

<script>

import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/FotoService'

export default {

  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },

  data() {

    return {

      titulo: 'Alurapic', 
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },

   methods: {
        remover(foto){
          this.$http
          .delete(`v1/fotos/${foto._id}`)
          .then(
            () => {
              let indice = this.fotos.indexOf(foto);
              this.fotos.splice(indice, 1);
              this.mensagem = 'Foto removida com sucesso'
            }, 
            err => {
              this.mensagem = 'Não foi possível remover a foto';
              console.log(err);
            }
          )
      }
   },

  computed: {
    fotosComFiltro(){
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      }else{
        return this.fotos;
      }
    }    
 },

  created(){

    this.$http
      .get('v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));

  }
}
</script>

<style>

  .corpo{
    font-family: Arial, Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .titulo-centralizado{
    text-align: center;
  }

  .lista-fotos{
    list-style: none;
  }

  .lista-fotos .lista-fotos-itens{
    display: inline-block;
  }

  .filtro{
    display: block;
    width: 100%;
  }

</style>