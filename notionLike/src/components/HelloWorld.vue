<script setup lang="ts">
import { ref } from 'vue';
import Line from './Line.vue';
import TextComponent from './TextComponent.vue';
import { NotionLike } from '../type';
type Item = {
    message: string;
    id: number;
    component: NotionLike;
    level: number;
};
type DropEvent = DragEvent & { dataTransfer: DataTransfer };
const id = ref(0);
const items = ref<Item[]>([
    { 
        message: 'Vive',
        id: id.value++,
        component: TextComponent,
        level: 0
    },
    {
        message: 'League of',
        id: id.value++,
        component: TextComponent,
        level: 0
    },
    {
        message: 'legend',
        id: id.value++,
        component: TextComponent,
        level: 0
    }
]);
const selected = ref<Item | null>(null);
const text = ref("");
const dragging = ref(false);
function ajouter() {
    items.value.push({
        message: text.value,
        id: id.value++,
        component: TextComponent,
        level: 0
    });
    text.value = "";
}
function supprimer(i: number) {
    items.value.splice(i, 1);
}
function select(item: Item) {
    selected.value = item;
}
function ligne(i: number, component: NotionLike, level: number) {
    const item = {
        message: "",
        id: id.value++,
        component, level
    };
    items.value.splice(i + 1, 0, item);
    selected.value = item;
}
function desindenter(item: Item) {
    if (item.level > 0) item.level--;
}
function dragstartHandler(e: DragEvent & { dataTransfer: DataTransfer }, item: Item) {
    dragging.value = true;
    console.log("dragstart_handler");
    e.dataTransfer.setData('text/plain', item.id.toString());
    e.dataTransfer.effectAllowed = 'move';
}
function dropHandler(e: DragEvent & { dataTransfer: DataTransfer }, newindex: number) {
    dragging.value = false;
    (e.currentTarget as HTMLDivElement).classList.remove("dragover");
    const id = parseInt(e.dataTransfer.getData('text/plain'));
    const index = items.value.findIndex((item) => item.id == id);
    const item = items.value.splice(index, 1);
    if (index < newindex) {
        newindex--;
    }
    items.value.splice(newindex + 1, 0, ...item)
  }
  function dragenter_handler (e: DragEvent) {
  (e.currentTarget as HTMLDivElement).classList.add("dragover");
}
document.addEventListener("mousedown", (e: MouseEvent) => {
    if (selected && (e.target as HTMLElement).getAttribute("data-id") != selected.value?.id.toString()) {
        selected.value = null;
    }
});
</script>

<template>
<div id="page">
  
  <div class="border">
    <div @drop="(e) => dropHandler (e as DropEvent, -1)"
      @dragover.prevent
      @dragenter.prevent="dragenter_handler"
     class="line">regege</div>
    <Line 
    @lacher="(e) => dropHandler (e, i)"
    @deplacer="(e) => dragstartHandler (e, item)" 
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
.border.dragging :deep(.box *:not(#dragger)) {
    pointer-events: none;
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
.dragover {
    border-bottom: 2px solid blue;
}
</style>