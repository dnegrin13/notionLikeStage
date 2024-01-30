<script setup lang="ts">
import ListDeroulante from './ListDeroulante.vue';
import { NotionLike } from '../type';
import TextComponent from './TextComponent.vue';
import Titre1Component from './Titre1Component.vue';
import Titre2Component from './Titre2Component.vue';
import Titre3Component from './Titre3Component.vue';
import ListApuce from './ListApuce.vue'
import { ref,  watchPostEffect } from 'vue';
const props = defineProps(['modelValue', 'selected', 'component', 'dataID'])
const emit = defineEmits([
    'update:modelValue', 
    'update:component', 
    'supprimer', 
    'modifier', 
    'deselectionner', 
    'indenter', 
    'desindenter', 
    'deplacer',
    'lacher'
])
const inputRef = ref < HTMLInputElement > ()
function update(e: Event) {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}
function updateComponent (composant: NotionLike) {
    emit('update:component', composant)
}
watchPostEffect( () => {
    if(props.selected){
        inputRef.value?.focus()
    }
})
const itemRef = ref < HTMLDivElement > ()
function dragenter_handler (e: DragEvent ) {
    e.preventDefault()
    const element = e.currentTarget as HTMLDivElement
    if(!element.classList.contains("dragged"))
        element.classList.add("dragover");
  }
  function dragleave_handler (e: DragEvent ) {
    (e.currentTarget as HTMLDivElement).classList.remove("dragover");
  }
  function dragstart_handler (e: DragEvent ) {
    itemRef.value?.classList.add("dragged");
    (e.currentTarget as HTMLDivElement).style.border = "dashed";
    emit('deplacer', e)
  }
  function icon_dragend_handler (e: DragEvent ) {
    itemRef.value?.classList.remove("dragged");
    (e.target as HTMLDivElement).style.border = 'none';
  }
  function drop_handler (e: DragEvent ) {
    itemRef.value?.classList.remove("dragover");
    emit("lacher", e)
  }
  function dragover_handler (e: DragEvent ) {
    e.preventDefault()
  }
</script>

<template>
<div class="item" 
@dragover="dragover_handler"
@dragenter="dragenter_handler" 
@drop="drop_handler" 
@dragleave="dragleave_handler" 
ref = "itemRef" >
    <ListDeroulante>
        <ul id="selectComponent">
            <li><button @click="updateComponent (TextComponent)">Texte</button></li>
            <li><button @click="updateComponent (Titre1Component)">Titre 1</button></li>
            <li><button @click="updateComponent (Titre2Component)">Titre 2</button></li>
            <li><button @click="updateComponent (Titre3Component)">Titre 3</button></li>
            <li><button @click="updateComponent (ListApuce)">Liste a puce</button></li>
        </ul>
    </ListDeroulante>
    <div draggable="true" @dragstart="dragstart_handler" @dragend="icon_dragend_handler" >
        <v-icon name="ri-drag-move-2-fill" />
    </div>
    <input class="textContainer"
    @keydown.prevent.shift.tab="emit('desindenter')" 
    @keydown.prevent.tab.exact="emit('indenter')" 
    :value="props.modelValue"
    ref = "inputRef" 
    @input="update" 
    :data-id="props.dataID" 
    @keyup.enter="emit('deselectionner')"
    v-if="props.selected" />
    <template v-else>
        <component class="textContainer" @click="emit('modifier')" :is="props.component">{{ props.modelValue }}</component>
        <button @click="emit('supprimer')"><v-icon fill="blue" name="bi-trash" alt="Supprimer élément de la liste" /></button>
    </template>
</div>
</template>

<style scoped>
#selectComponent {
    list-style: none;
}
.item{
    display: flex;
}
.textContainer {
    flex-grow: 1;
}
.dragover {
  border-bottom:  2px solid blue; 
}
.dragover > * {
    pointer-events: none;
}
</style>