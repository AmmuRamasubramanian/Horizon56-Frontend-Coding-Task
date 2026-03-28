<script setup lang="ts">
import Sqcheckbox from '@/assets/icons/Sqcheckbox.svg'
import SquareBigBox_Unfilled from '@/assets/icons/SquareBigBox_Unfilled.svg'

const props = defineProps<{
  selectedfilterOptions: string[]
}>()

const filterOptions=['Draft', 'Approved', 'Active', 'Completed']

const emit = defineEmits<{
  (e: 'close'): void
  (e:'updatefilter', option:string) :void
}>()

function onClose(){
   emit('close')
}

function updateFilter(option:string){
    emit('updatefilter', option)
}

</script>

<template>
    <div class="overlay" @click="onClose"></div>
    <div class="filteroptiondiv" @click.stop>
        <div
            v-for="(option, optionIndex) in filterOptions"
            :key="option"
        >
            <div 
                class="filteroptiondiv__optionOuter" 
                :class="[optionIndex!==0 ? 'filteroptiondiv--topgapforoption' : '']"
                @click="updateFilter(option)"
            >
                <div class="filteroptiondiv__inneroptionflex">
                <p class="filteroptiondiv__optionText">{{ option }}</p>
                </div>
                <component
                    :is="props.selectedfilterOptions.includes(option) 
                    ? Sqcheckbox 
                    : SquareBigBox_Unfilled"
                    class="filteroptiondiv__checkbox-icon"
                    :class="{
                        'checked': props.selectedfilterOptions.includes(option),
                        'unchecked': !props.selectedfilterOptions.includes(option)
                    }"
                    
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .filteroptiondiv{
        position: absolute;
        top:45px;
        right:3px;
        background-color: var(--veryDrkGreyishBlue);
        width:140px;
        padding:7px;
        border-radius: 5px;
        border-width: 0.8px;
        border-style: solid;
        border-color: var(--lighterAshBlue);

        &__optionOuter{
            padding: 0px 10px;
            height:32px;
            min-height:32px;
            display: flex;
            align-items: center;
            border-radius: 5px;
            background-color: var(--veryDrkBlue2);
            justify-content: space-between;
            cursor: pointer;
            user-select: none;

            &:hover{
                background-color: var(--lighterAshBlue);
            }
        }

        &__inneroptionflex{
            display: flex;
            align-items: center;
        }

        &__optionText{
            color:white;
            font-family: var(--avenirMedium);
            font-size: 0.7em;
        }

        &--topgapforoption{
            margin-top:5px;
        }

        &__checkbox-icon{
            width: 12px;
            height:12px;
            min-width: 12px;
            min-height: 12px;
        }

        &__checkbox-icon.checked{
            fill:var(--greenishyellow);
        }

        &__checkbox-icon.unchecked{
            fill:var(--steelBlue);
        }
    }
</style>