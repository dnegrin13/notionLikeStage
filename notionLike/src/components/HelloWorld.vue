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
defineProps<{ msg: string }>()
const id = ref(0)
const items = ref < Item []>([
  {message: 'Vive', id: id.value++, component: TextComponent, level: 0}, 
  {message: 'League of', id: id.value++, component: TextComponent, level: 0}, 
  {message: 'legend', id: id.value++, component: TextComponent, level: 0}
])
const selectActive = ref(false)
 function ajouter() {
  items.value.push({message : text.value, id: id.value++, component: TextComponent, level: 0})
  text.value = ""
 }
 function supprimer(i: number) {
  items.value.splice(i, 1)
 }
 function transformer() {
  //item.component = Titre1Component
  selectActive.value = true
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
</script>

<template>
<div>
  
  <div class="border">
    <Line :style="{
      marginLeft: (item.level * 16) + 'px'
    }" 
    v-for="(item, i) in items" 
    :key="item.id" 
    class="line"
    v-model="item.message" 
    @supprimer="supprimer(i)"
    @modifier="select(item)" 
    @deselectionner="ligne(i, item.component, item.level)" 
    @transformer="transformer"
    @indenter="item.level++" 
    :selected="selected == item"
    :dataID="item.id" 
    v-model:component="item.component"
    />
    <div id="selection" :class="{selectActive}">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, animi esse labore quisquam repudiandae asperiores fuga earum iure tenetur sed hic. Quidem quam modi consequuntur perspiciatis quis, perferendis nostrum non!
    </div>
  </div>
  <input @keyup.enter="ajouter" v-model="text" type="text">
  <button @click="ajouter">Ajouter élément à la liste</button>
</div>
</template>

<style scoped>
  .line {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    color: red;
    font-size: 18px;
  }
  .border {
    border: 3px solid black;
  }
  button {
    background-color: black;
    color: white;
    padding-top: 2px;
    height: 29px;
    text-align: center;
  }
  input {
    height: 20px;
  }
  #selection {
    display: none;
  }
  #selection.selectActive {
    display: block;
  }
</style>
