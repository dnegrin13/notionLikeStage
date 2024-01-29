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
const emit = defineEmits(['update:modelValue', 'update:component', 'supprimer', 'transformer', 'modifier', 'deselectionner', 'indenter'])
const inputRef = ref < HTMLInputElement > ()
function update(e: Event) {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}
function updateComponent (composant: NotionLike) {
    emit('update:component', composant)
}
const indenter = (e: KeyboardEvent) => {
            if(e.key == "Tab") {
                e.preventDefault()
                emit("indenter")
            }
        }
watchPostEffect( () => {
    if(props.selected){
        inputRef.value?.focus()
        document.addEventListener("keydown", indenter)
    }else {
        document.removeEventListener("keydown", indenter)
    }
})
</script>

<template>
<div>
    <ListDeroulante>
        <ul id="selectComponent">
            <li><button @click="updateComponent (TextComponent)">Texte</button></li>
            <li><button @click="updateComponent (Titre1Component)">Titre 1</button></li>
            <li><button @click="updateComponent (Titre2Component)">Titre 2</button></li>
            <li><button @click="updateComponent (Titre3Component)">Titre 3</button></li>
            <li><button @click="updateComponent (ListApuce)">Liste a puce</button></li>
        </ul>
    </ListDeroulante>
    <input :value="props.modelValue"
    ref = "inputRef" 
    @input="update" 
    :data-id="props.dataID" 
    @keyup.enter="emit('deselectionner')"
    v-if="props.selected" />
    <template v-else>
        <component @click="emit('modifier')" :is="props.component">{{ props.modelValue }}</component>
        <button @click="emit('supprimer')">Supprimer élément de la liste</button>
        <button @click="emit('transformer')">Transformer élément de la liste</button>
    </template>
</div>
</template>

<style>
#selectComponent {
    list-style: none;
}
</style>