<script setup lang="ts">
import StepFlow from './StepFlow.vue'
import {ref, computed, onMounted, onUnmounted} from 'vue'
import horizon56 from '../assets/icons/horizon56.jpeg'
import Puzzle from '../assets/icons/puzzle.svg'
import Zap from '../assets/icons/zap.svg'
import AssignmentMainPage from './AssignmentComps/AssignmentMainPage.vue'

const screenWidth = ref(window.innerWidth)

function updateWidth() {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

const activeNav = ref<string>("component")

function ActivateNavfunc(value:string){
    activeNav.value=value
}

const isComponentTabActive=computed(()=>activeNav.value==='component')

const sidenavbarShrinkWidth=computed(()=>screenWidth.value<1300)
const sidenavbarFixedWidth=computed(()=>screenWidth.value<1020)
const mobilenavbarWidth=computed(()=>screenWidth.value<570)

</script>

<template>
    <div class="topcontentdiv" :class="[sidenavbarFixedWidth ? 'topcontentdiv--flextopdiv' : '']">
        <!-- --------------------SIDE NAV BAR VIEW-------------------------- -->
        <div class="sidebar" v-if="!mobilenavbarWidth" :class="[sidenavbarFixedWidth ? 'sidebar--sideNavFixed' : '']">
            <div class="sidebar__brand" :class="{ 'sidebar__brand--collapsed': sidenavbarShrinkWidth }">
                <img :src="horizon56" class="sidebar__logo" />
                
                <div class="sidebar__title-wrapper">
                <p v-if="!sidenavbarShrinkWidth" class="sidebar__title">Horizon</p>
                </div>
            </div>

            <div class="sidebar__menu" :class="{ 'sidebar__menu--collapsed': sidenavbarShrinkWidth }">
                
                <div 
                class="sidebar__item"
                @click="ActivateNavfunc('component')"
                :class="[
                { 'sidebar__item--active': isComponentTabActive },
                { 'sidebar__item--collapsed': sidenavbarShrinkWidth }
                ]"
                >
                <Zap 
                    class="sidebar__icon"
                    :class="{ 'sidebar__icon--inactive': !isComponentTabActive }"
                />
                
                <p 
                    v-if="!sidenavbarShrinkWidth"
                    class="sidebar__text"
                    :class="{ 'sidebar__text--inactive': !isComponentTabActive }"
                >
                    Component
                </p>
                </div>

                <div class="sidebar__divider"></div>

                <div 
                class="sidebar__item"
                @click="ActivateNavfunc('dynamically_executed')"
                :class="[
                { 'sidebar__item--active': !isComponentTabActive },
                { 'sidebar__item--collapsed': sidenavbarShrinkWidth }
                ]"
                >
                <Puzzle 
                    class="sidebar__icon"
                    :class="{ 'sidebar__icon--inactive': isComponentTabActive }"
                />

                <p 
                    v-if="!sidenavbarShrinkWidth"
                    class="sidebar__text"
                    :class="{ 'sidebar__text--inactive': isComponentTabActive }"
                >
                    Dynamically used
                </p>
                </div>

            </div>
        </div>
        <!-- --------------------BOTTOM NAV BAR FOR MOBILE VIEW-------------------------- -->
        <div v-else class="bottomTab">
        <div 
            class="bottomTab__item"
            @click="ActivateNavfunc('component')"
            :class="{ 'bottomTab__item--active': isComponentTabActive }"
        >
            <Zap class="bottomTab__icon" />
            <p class="bottomTab__text">Component</p>
        </div>

        <div 
            class="bottomTab__item"
            @click="ActivateNavfunc('dynamically_executed')"
            :class="{ 'bottomTab__item--active': !isComponentTabActive }"
        >
            <Puzzle class="bottomTab__icon" />
            <p class="bottomTab__text">Dynamic</p>
        </div>
        </div>
        <!-- --------------------CONTENT-------------------------- -->
        <div class="reusablecomp" v-if="isComponentTabActive">
            <p class="reusablecomp_mainTitle">Component - Reusable</p>
            <StepFlow/>
        </div>
        <div class="assignmentMainPageOuter" v-if="!isComponentTabActive">
            <AssignmentMainPage :screenWidth="screenWidth"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .topcontentdiv{
        display:flex;
        flex-direction:column;
        flex:1;

        &--flextopdiv{
            display:flex;
            flex-direction:row
        }
    }

    //--------------------SIDE NAV BAR STYLES--------------------------
    .sidebar {
        position: absolute;
        top: 15px;
        left: 15px;

        &--sideNavFixed{
            position:relative;
        }

        &__brand {
            display: flex;
            align-items: center;
            background-color: var(--veryDrkGreyishBlue);
            padding: 8px;
            width: 200px;
            border-radius: 8px;
            border: 0.8px solid var(--lighterAshBlue);

            &--collapsed {
                width: 50px;
            }
        }

        &__logo {
            width: 34px;
            height: 34px;
            border-radius: 5px;
        }

        &__title-wrapper {
            margin-left: 10px;
        }

        &__title {
            color: white;
            font-size: 0.76em;
            font-family: var(--robotoFontFamily);
        }

        &__menu {
            margin-top: 10px;
            padding: 8px;
            width: 200px;
            background-color: var(--veryDrkGreyishBlue);
            border-radius: 8px;
            border: 0.8px solid var(--lighterAshBlue);

            &--collapsed {
                width: 50px;
            }
        }

        &__item {
            height: 36px;
            display: flex;
            align-items: center;
            padding: 0 12px;
            border-radius: 7px;
            cursor: pointer;
            border: 0.8px solid transparent;

            &--active {
                border-color: var(--ashBlue);
            }

            &--collapsed{
                padding:0px;
                justify-content:center;
            }
        }

        &__icon {
            width: 14px;
            height: 14px;
            min-width:14px;
            min-height:14px;
            stroke: white;

            &--inactive {
            stroke: var(--bluishSteelBlue);
            }
        }

        &__text {
            margin-left: 8px;
            font-size: 0.65em;
            color: white;
            font-family: var(--geistMono);

            &--inactive {
            color: var(--bluishSteelBlue);
            }
        }

        &__divider {
            margin-top: 5px;
        }
    }

    //--------------------BOTTOM NAV BAR STYLES FOR MOBILE VIEW--------------------------
    .bottomTab {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        
        display: flex;
        justify-content: space-around;
        align-items: center;

        background-color: var(--veryDrkGreyishBlue);
        border-top: 1px solid var(--lighterAshBlue);
        padding: 10px 0;

        z-index: 1000;

        &__item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            color: var(--steelBlue);
        }

        &__item--active {
            color: white;
        }

        &__icon {
            width: 20px;
            height: 20px;
            min-width:20px;
            min-height:20px;
        }

        &__text {
            font-size: 0.7em;
            font-family:var(--geistMono);
        }
    }

    .reusablecomp{
        display:flex;
        flex-direction:column;
        flex:1;
        align-items:center;

        @media (max-width: 500px) {
          padding:0px 2em;
        }
    }

    .reusablecomp_mainTitle{
        color:white; 
        margin-bottom:1.3em; 
        text-align:center; 
        font-size:1.7em; 
        font-family:var(--robotoFontFamily); 
        font-weight:400; 
        margin-top:4em;
    }

    .assignmentMainPageOuter{
        display:flex;
        flex:1;
        flex-direction:column
    }

</style>