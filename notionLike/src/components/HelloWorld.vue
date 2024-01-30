<script setup lang="ts">
import { ref } from 'vue'
import Line from './Line.vue'
import TextComponent from './TextComponent.vue'
import {NotionLike} from '../type'

type Item = {
    message: string;
    id: number;
    component: NotionLike ;
    level: number;
}
const id = ref(0)
const items = ref < Item []>([
  {message: 'Vive', id: id.value++, component: TextComponent, level: 0}, 
  {message: 'League of', id: id.value++, component: TextComponent, level: 0}, 
  {message: 'legend', id: id.value++, component: TextComponent, level: 0}
])
 function ajouter() {
  items.value.push({message : text.value, id: id.value++, component: TextComponent, level: 0})
  text.value = ""
 }
 function supprimer(i: number) {
  items.value.splice(i, 1)
 }
 const selected = ref < Item | null> (null)
 function select(item: Item) {
  selected.value = item
 }
 const text = ref("")
 document.addEventListener("mousedown", (e : MouseEvent) => {
    if(selected && (e.target as HTMLElement).getAttribute("data-id") != selected.value?.id.toString()){
      selected.value = null
    }
  })
  function ligne (i: number, component: NotionLike, level: number) {
    const item = {message : "", id: id.value++, component, level}
    items.value.splice(i + 1, 0, item)
    selected.value = item
  }
  function desindenter (item: Item) {
    if(item.level > 0) {item.level--}
  }
  function dragstart_handler(e: DragEvent & {dataTransfer: DataTransfer}, item: Item) {
    console.log("dragstart_handler");
    e.dataTransfer.setData('text/plain', item.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  }
  function drop_handler(e: DragEvent & {dataTransfer: DataTransfer}, newindex: number) {
    console.log("drop_handler")
    const id = parseInt(e.dataTransfer.getData('text/plain'))
    const index = items.value.findIndex((item) => item.id == id)
    const item = items.value.splice(index, 1)
    if(index < newindex){
      newindex--;
    }
    items.value.splice(newindex + 1, 0, ...item)
  }
  function preventDefault(e: DragEvent) {
    e.preventDefault()
  }
  type dropEvent = DragEvent & {dataTransfer: DataTransfer};
</script>

<template>
<div id="page">
  
  <div class="border">
    <div @drop="(e) => drop_handler (e as dropEvent, -1)"
    @dragover="preventDefault"
    @dragenter="preventDefault"
     class="line">regege</div>
    <Line 
    @lacher="(e) => drop_handler (e, i)"
    @deplacer="(e) => dragstart_handler (e, item)" 
    :style="{
      marginLeft: (item.level * 16) + 'px'
    }" 
    v-for="(item, i) in items" 
    :key="item.id" 
    class="line"
    v-model="item.message" 
    @supprimer="supprimer(i)"
    @modifier="select(item)" 
    @deselectionner="ligne(i, item.component, item.level)" 
    @indenter="item.level++" 
    @desindenter="desindenter(item)" 
    :selected="selected == item"
    :dataID="item.id" 
    v-model:component="item.component"
    />
  </div>
  <input @keyup.enter="ajouter" v-model="text" type="text">
  <button @click="ajouter"><v-icon fill="white" name="ri-add-fill" alt="Ajouter élément à la liste" /></button>
</div>
</template>

<style scoped>
  .line {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: red;
    font-size: 18px;
    width: 100%;
  }
  .border {
    border: 3px solid black;
    width: 100%;
  }
  button {
    background-color: black;
    height: 29px;
    text-align: center;
  }
  input {
    height: 20px;
  }
  #page {
    max-width: 960px;
    margin: auto;
  }
</style>
