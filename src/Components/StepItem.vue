
<script setup lang="ts">

import {ref, watch, computed} from 'vue'
import {useAssignmentstore} from '@/store/assignmentStore'
import Workgroup from '@/assets/icons/Workgroup.svg'

const store = useAssignmentstore()

interface Assignment {
  id: number
  title: string,
  status: 'Draft' | 'Approved' | 'Active' | 'Completed'
  remarks: string
}

interface Props{
    title:string
    id:number
    subtitle?:string
    remarks?:string
    contentHeight:number
    isActive?: boolean
    isLast?: boolean
    withUpdatedVal?:boolean
    selectedassignItemId?:number | null
}

const props=withDefaults(defineProps<Props>(),{
    isLast:false, 
    isActive:false
})

const emit = defineEmits<{
  activate: [id:number]
}>()

const stepDesc_val=ref<string>(props.remarks ?? '')


watch(
    ()=>props.remarks,
    (newVal)=>{
        stepDesc_val.value=newVal ?? ''
    }
)

function handleChangeStepVal(e:Event) {
    const target=e.target as HTMLInputElement
    stepDesc_val.value=target.value
    if(props.withUpdatedVal===true){
       store.updateStatus(props.selectedassignItemId ?? null,target.value, props.title as Assignment['status'])
    }
}

</script>

<template>
    <div class="step-item">
    <div class="step-item__container">

        <div class="step-item__indicator-wrapper">

        <div 
            class="step-item__circle"
            :class="{
            'step-item__circle--active': props.isActive,
            'step-item__circle--inactive': !props.isActive
            }"
            @click="emit('activate', props.id)"
        >
            <div 
            v-if="props.isActive"
            class="step-item__inner-circle"
            >
            </div>
        </div>

        <div 
            v-if="!props.isLast" 
            class="step-item__line"
        >
        </div>

        </div>

        <div 
        class="step-item__content"
        :class="{ 'step-item__content--with-gap': !props.isLast }"
        >

        <div class="step-item__titleDiv" @click="emit('activate', props.id)">
        <p 
            class="step-item__title"
            :class="{ 'step-item__title--inactive': !props.isActive }"
        >
            {{ props.title.toUpperCase() }}
        </p>
        </div>

        <div v-if="props.isActive">

            <div class="step-item__subheaderflex">
            <Workgroup class="step-item__stepIcon"/>
            <p class="step-item__subtitle">
            {{ props.subtitle }}
            </p>
            </div>

            <div 
            class="step-item__description"
            :style="{ height: props.contentHeight + 'px' }"
            >
                <textarea
                :value="stepDesc_val"
                class="step-item__inputText"
                placeholder="Start typing..."
                :style="{
                    maxHeight: '100%'
                }"
                @input="handleChangeStepVal"
                />
            </div>

        </div>

        </div>

    </div>
    </div>
</template>

<style scoped lang="scss">
    .step-item {
        &__container {
            display: flex;
        }

        &__indicator-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__circle {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor:pointer;

            &--active {
            background-color: #49A171;
            }

            &--inactive {
            background-color: var(--lighterAshBlue);
            }
        }

        &__inner-circle {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: white;
        }

        &__line {
            width: 1.7px;
            flex: 1;
            background-color: var(--lighterAshBlue);
        }

        &__content {
            margin-left: 10px;
            flex: 1;

            &--with-gap {
            padding-bottom: 26px;
            }
        }

        &__titleDiv{
            cursor: pointer;
        }

        &__title {
            color: white;
            font-size: 0.75em;
            font-family:var(--robotoFontFamily);

            &--inactive {
            color: var(--steelBlue);
            }
        }

        &__subheaderflex{
            margin-top: 8px;
            display:flex;
            align-items:center;
        }

        &__subtitle {
            font-size: 0.72em;
            font-family:var(--robotoFontFamily);
            color: var(--steelBlue);
            margin-left:6px
        }

        &__stepIcon{
            width:14px;
            height:14px;
            min-width:14px;
            min-height:14px;
            fill:var(--steelBlue)
        }

        &__description {
            margin-top: 10px;
            padding: 10px;
            border: 0.8px solid var(--ashBlue);
            border-radius: 7px;
            background-color: var(--veryDrkBlue2);
        }

        &__inputText{
            font-size: 0.72em;
            font-family:var(--avenirMedium);
            color: white;
            background: transparent;
            flex:1;
            resize:none;
            width:100%;
            height:100%;
            line-height:19px;
        }

        &__inputText::placeholder{
            color: var(--steelBlue);
        }

        &__saveBtnOuter{
            background-color:var(--purpleBlueBtnColor);
            height:30px;
            min-height:30px;
            display:flex;
            justify-self:flex-end;
            align-items:center;
            padding:0px 10px;
            border-radius:7px;
            cursor:pointer;
        }

        &__saveText{
            font-size: 0.72em;
            font-family:var(--avenirMedium);
            color: white;
        }
    }
</style>
