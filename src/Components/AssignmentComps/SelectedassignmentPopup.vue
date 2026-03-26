<script setup lang="ts">

import Close from '@/assets/icons/close.svg'
import StepFlow from '../StepFlow.vue'
import {ref, watch} from 'vue'
import { useMotion } from '@vueuse/motion'

interface Assignment {
  id: number
  title: string,
  status: 'Draft' | 'Approved' | 'Active' | 'Completed'
  remarks: string
}

interface Props{
    selectedassignItem:Assignment | undefined
    isMobileView?:boolean | null
}

const props=defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onClose(){
   emit('close')
}

const popupRef=ref<HTMLElement | null>(null)

let motionControls: any = null


watch(
  () => props.selectedassignItem,
  (newVal) => {
    if (newVal && popupRef.value) {
      const motion = useMotion(popupRef, {
        initial: props.isMobileView
          ? { y: '100%' }
          : { scale: 0.98, opacity: 0.98 }
      })

      motion.apply(
        props.isMobileView
          ? { y: '0%', transition: { type: 'tween', duration: 0.3 } }
          : { scale: 1, opacity: 1, transition: { type: 'spring', duration: 0.3 } }
      )
    }
  }
)

</script>

<template>
    <div 
    class="selectedAssignPopup"
    @click="onClose"
    ref="popupRef"
    >
        <Motion 
            class="selectedAssignPopup__contentdiv" 
            @click.stop
        >
            <!-- <div class='selectedAssignPopup__headercontainer'>
                <p class="selectedAssignPopup__title">{{props.selectedassignItem?.title}}</p>
                <div class='selectedAssignPopup__closeIconOuter' @click="onClose">
                    <Close class="selectedAssignPopup__closeIcon"/>
                </div>
            </div> -->
            <div class="selectedAssignPopup_contentOuter">
            <StepFlow :withUpdatedVal="true" :selectedassignItem="props.selectedassignItem"/>
            </div>
        </Motion>
    </div>
</template>

<style scoped lang="scss">
    .selectedAssignPopup{
        position: fixed;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.8);
        width: 100vw;
        height: 100vh;   
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        top:0;

        @media(max-width:570px){
            position: fixed;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.8);
            width: 100vw;
            height: 100dvh;
            z-index: 1000;
            bottom: 0px;
            top: 0px;
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
        }

        .selectedAssignPopup__contentdiv {
            background-color: var(--veryDrkGreyishBlue);
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            padding: 15px 15px;
            user-select:none;
            position:relative;

            @media(max-width:570px){
                width:100%;
                border-bottom-left-radius:0px;
                border-bottom-right-radius:0px
            }
        }

        .selectedAssignPopup__headercontainer{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0px 4px;
            padding-bottom: 10px;
            border-bottom-width: 0.8px;
            border-bottom-style: solid;
            border-bottom-color: var(--blueGrayLighter);
        }

        .selectedAssignPopup__title{
            color: white;
            font-family: var(--geistMono);
            font-size: 0.8em;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            max-width: 90%;
        }

        .selectedAssignPopup__closeIconOuter{
            cursor:pointer
        }

        .selectedAssignPopup__closeIcon{
            width: 10px;
            height: 10px;
            min-width:10px;
            min-height:10px;
            fill: var(--steelBlue);
        }

        .selectedAssignPopup_contentOuter{
            display:flex;
            align-items:center;
            flex-direction:column;
        }
    }
</style>

