<script setup lang="ts">
import ListDeroulante from './ListDeroulante.vue';
import { NotionLike } from '../type';
import TextComponent from './TextComponent.vue';
import Titre1Component from './Titre1Component.vue';
import Titre2Component from './Titre2Component.vue';
import Titre3Component from './Titre3Component.vue';
import ListApuce from './ListApuce.vue'
import { ref, watchPostEffect } from 'vue';
const props = defineProps([
    'modelValue',
    'selected',
    'component',
    'dataID']
);
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
]);
const inputRef = ref<HTMLInputElement>();
const itemRef = ref<HTMLDivElement>();
function update(e: Event) {
    emit('update:modelValue', (e.target as HTMLInputElement).value);
}
function updateComponent(composant: NotionLike) {
    emit('update:component', composant);
}
function dragenterHandler(e: DragEvent) {
    if (!itemRef.value?.classList.contains("dragged"))
        (e.currentTarget as HTMLDivElement).classList.add("dragover");
}
function dragleaveHandler(e: DragEvent) {
    (e.currentTarget as HTMLDivElement).classList.remove("dragover");
}
function dragstartHandler(e: DragEvent) {
    itemRef.value?.classList.add("dragged");
    (e.currentTarget as HTMLDivElement).style.border = "dashed";
    emit('deplacer', e);
}
function dragendHandler(e: DragEvent) {
    itemRef.value?.classList.remove("dragged");
    (e.target as HTMLDivElement).style.border = 'none';
}
function dropHandler(e: DragEvent) {
    (e.currentTarget as HTMLDivElement).classList.remove("dragover");
    emit("lacher", e);
}
watchPostEffect(() => {
    if (props.selected) inputRef.value?.focus();
});
</script>

<template>
    <div ref="itemRef" class="flex">
        <div class="flex box"
            @dragover.prevent
            @dragenter.prevent="dragenterHandler"
            @dragleave="dragleaveHandler"
            @drop="dropHandler"
        >
            <ListDeroulante>
                <ul id="select-component">
                    <li>
                        <button @click="updateComponent(TextComponent)">
                            Texte
                        </button>
                    </li>
                    <li>
                        <button @click="updateComponent(Titre1Component)">
                            Titre 1
                        </button>
                    </li>
                    <li>
                        <button @click="updateComponent(Titre2Component)">
                            Titre 2
                        </button>
                    </li>
                    <li>
                        <button @click="updateComponent(Titre3Component)">
                            Titre 3
                        </button>
                    </li>
                    <li>
                        <button @click="updateComponent(ListApuce)">
                            Liste a puce
                        </button>
                    </li>
                </ul>
            </ListDeroulante>
            <div id="dragger"
                draggable="true"
                @dragstart="dragstartHandler"
                @dragend="dragendHandler"
            >
                <v-icon name="ri-drag-move-2-fill" />
            </div>
        </div>
        <div class="flex grow box">
            <input class="grow" ref="inputRef"
                v-if="props.selected"
                :data-id="props.dataID"
                :value="props.modelValue"
                @input="update"
                @keydown.prevent.shift.tab="emit('desindenter')"
                @keydown.prevent.tab.exact="emit('indenter')"
                @keyup.enter="emit('deselectionner')"
            />
            <template v-else>
                <component
                    class="grow"
                    :is="props.component"
                    @click="emit('modifier')"
                >
                    {{ props.modelValue }}
                </component>
                <button @click="emit('supprimer')">
                    <v-icon fill="blue" name="bi-trash" alt="Supprimer élément de la liste" />
                </button>
            </template>
        </div>
    </div>
</template>

<style scoped>
#select-component {
    list-style: none;
}
.flex {
    display: flex;
}
.grow {
    flex-grow: 1;
}
.dragged > .box {
    pointer-events: fill;
}
.dragover {
    border-bottom: 2px solid blue;
}
</style>