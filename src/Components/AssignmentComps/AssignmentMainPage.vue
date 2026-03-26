<script setup lang="ts">
import SelectedassignmentPopup from './SelectedassignmentPopup.vue'
import {useAssignmentstore} from '@/store/assignmentStore'
import ChevronRight from '@/assets/icons/chevronRight.svg'
import SearchIcon from '@/assets/icons/searchIcon.svg'
import Close from '@/assets/icons/close.svg'
import {ref, computed} from 'vue'
import JungleAlligator_searching from '@/assets/icons/jungleAlligator_searching.svg'
import Workgroup from '@/assets/icons/Workgroup.svg'
import Usercheck from '@/assets/icons/Usercheck.svg'
import Shieldcheck from '@/assets/icons/Shieldcheck.svg'
import Archery from '@/assets/icons/Archery.svg'

const store=useAssignmentstore()

interface Assignment {
  id: number
  title: string,
  status: 'Draft' | 'Approved' | 'Active' | 'Completed'
  remarks: string
}

interface Props{
  screenWidth:number
}

const props=defineProps<Props>()

const searchTxt=ref<string>("")
const selectedassignId=ref<number | null>(null)
const showPopup=ref<Boolean>(false)

const isHideAddititonalInfo=computed(()=>props.screenWidth<1020)
const isMobileView=computed(()=>props.screenWidth<570)

const StatusIcons: Record<string, any> = {
  Draft: Workgroup,
  Approved: Usercheck,
  Active: Shieldcheck,
  Completed: Archery
}

const StatusColors: Record<string, string> = {
  Draft: '#A0A0A0',       // gray
  Approved: '#4CAF50',    // green
  Active: '#2196F3',      // blue
  Completed: '#FF9800'    // orange
}

function clearInput() {
    searchTxt.value=""
}

const filteredAssignment=computed(()=>{
    return store.assignments.filter(a =>
        a.title.toLowerCase().includes(searchTxt.value.toLowerCase())
    )
})

function handleChangeShowPopup(boolVal:boolean) {
    showPopup.value=boolVal
}

function handleClickAssignItem(id:number){
    selectedassignId.value=id
    handleChangeShowPopup(true)
}

const selectedItemVal=computed(()=>store.assignments.find(item=>item.id==selectedassignId.value))

</script>

<template>
  <div class="assignment-page">

    <!-- HEADER -->
    <div class="assignment-page__header" >
      <p class="assignment-page__title">Assignments</p>
      <p class="assignment-page__subtitle">
        A place where all the available works and their status is present.
      </p>

      <!-- SEARCH -->
      <div class="assignment-page__search">
        <SearchIcon class="assignment-page__search-icon" />

        <input
          v-model="searchTxt"
          class="assignment-page__input"
          placeholder="Search in #Assignments"
        />

        <div
          v-if="searchTxt"
          class="assignment-page__clear-btn"
          @click="clearInput"
        >
          <Close class="assignment-page__clear-icon" />
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="assignment-page__content" v-if="filteredAssignment.length">

      <!-- TABLE HEADER -->
      <div class="assignment-page__table-header">
        <p class="assignment-page__header-text">Works</p>

        <div class="assignment-page__columns" v-if="!isHideAddititonalInfo">
          <div class="assignment-page__status">
            <p class="assignment-page__header-text">Status</p>
          </div>
          <div class="assignment-page__remarks">
            <p class="assignment-page__header-text">Remarks</p>
          </div>
          <div class="assignment-page__actions"></div>
        </div>
      </div>

      <!-- LIST -->
      <div class="assignment-page__list">
        <div class="assignment-page__table">

          <div
            v-for="(assignment, index) in filteredAssignment"
            :key="assignment.id"
            class="assignment-page__row"
            :class="{ 'assignment-page__row--first': index === 0 }"
            @click="handleClickAssignItem(assignment.id)"
          >
            <p class="assignment-page__name">
              {{ assignment.title }}
            </p>

            <div class="assignment-page__columns" v-if="!isHideAddititonalInfo">
              <div class="assignment-page__status">
                <component  :style="{ fill: StatusColors[assignment.status] }" :is="StatusIcons[assignment.status]" class="assignment-page__status-icon"/>
                <p class="assignment-page__status-text">
                  {{ assignment.status }}
                </p>
              </div>

              <div class="assignment-page__remarks">
                <p class="assignment-page__remarks-text">
                  {{ assignment.remarks || '---' }}
                </p>
              </div>

              <div class="assignment-page__actions">
                <ChevronRight class="assignment-page__chevron" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- EMPTY STATE -->
    <div class="assignment-page__content" v-else>
      <div class="assignment-page__empty">
        <JungleAlligator_searching class="assignment-page__empty-icon" />
        <p class="assignment-page__empty-title">We searched far and wide.</p>
        <p class="assignment-page__empty-subtitle">
          Unfortunately, no results found
        </p>
      </div>
    </div>

    <!-- POPUP -->
    <SelectedassignmentPopup
      v-if="showPopup"
      :selectedassignItem="selectedItemVal"
      @close="showPopup = false"
      :isMobileView="isMobileView"
    />

  </div>
</template>

<style scoped lang="scss">
.assignment-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 3em;
  flex:1;

  &__header {
    width: var(--MAXASSIGN_WIDTH);
    align-self: center;
    display: flex;
    flex-direction: column;

    @media (max-width: 1020px) {
      width: 85%;
      min-width:85%
    }
  }

  &__title {
    color: white;
    font-size: 1.2em;
    font-family:var(--avenirMedium);
  }

  &__subtitle {
    margin-top: 10px;
    color: var(--steelBlue);
    font-size: 0.7em;
    font-family:var(--geistMono);
    line-height:19px;
  }

  &__search {
    margin-top: 20px;
    width: 360px;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-radius: 10px;
    background: var(--veryDrkGreyishBlue);
    border: 0.5px solid var(--ashBlue);

    @media (max-width: 570px) {
      width: 100%;
    }
  }

  &__search-icon {
    width: 13px;
    height: 13px;
    fill: var(--steelBlue);
    transform: rotate(270deg);
  }

  &__input {
    flex: 1;
    margin: 0 15px;
    background: transparent;
    color: white;
    font-size: 0.7em;
    font-family:var(--avenirMedium)
  }

  &__input::placeholder{
    color: var(--steelBlue);
  }

  &__clear-btn {
    cursor: pointer;
  }

  &__clear-icon {
    width: 10px;
    height: 10px;
    fill: var(--steelBlue);
  }

  &__content {
    margin-top: 30px;
    width: var(--MAXASSIGN_WIDTH);
    align-self: center;
    display: flex;
    flex-direction: column;
    flex: 1;

    @media (max-width: 1020px) {
      width: 85%;
      min-width:85%
    }
  }

  &__table-header {
    display: flex;
    justify-content: space-between;
    padding: 0 14px;
    height: 40px;
    border: 0.8px solid var(--lightBlueGray);
    border-radius: 10px 10px 0 0;
    align-items:center;
  }

  &__header-text {
    color: var(--steelBlue);
    font-size: 0.7em;
     font-family:var(--avenirMedium)
  }

  &__columns {
    display: flex;
    align-items: center;
  }

  &__status {
    width: 120px;
    display: flex;
    justify-content: center;
    margin-right:10px;
  }

  &__remarks {
    width: 120px;
    margin-right:10px;
    display: flex;
    justify-content: center;
  }

  &__actions {
    width: 40px;
    display: flex;
    justify-content: center;
  }

  &__list {
    flex: 1;
    overflow-y: auto;
  }

  &__table {
    display: flex;
    flex-direction: column;
    border: 0.8px solid var(--lightBlueGray);
    border-top: none;
    border-radius: 0 0 10px 10px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    padding: 0 14px;
    height: 46px;
    border-top: 0.8px solid var(--lightBlueGray);
    cursor: pointer;
    align-items:center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    max-width:100%;

    &:hover {
      background: var(--hoveredPrimaryBgColor);
    }

    &--first {
      border-top: none;
    }
  }

  &__name {
    color: white;
    font-size: 0.7em;
    font-family:var(--geistMono);
     white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    max-width:90%;

    @media (max-width: 397px) {
      max-width:190px;
    }
  }

  &__status-text,
  &__remarks-text {
    color: var(--bluishSteelBlue);
    font-size: 0.68em;
    font-family:var(--geistMono);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  &__status-icon{
    width:14px;
    height:14px;
    min-width:14px;
    min-height:14px;
    margin-right:7px;
  }

  &__chevron {
    width: 12px;
    height: 12px;
    stroke: var(--bluishSteelBlue);
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__empty-title {
    margin-top: -20px;
    color: white;
    font-family:var(--avenirMedium);
    font-size:0.8em;
  }

  &__empty-subtitle {
    color: var(--steelBlue);
    font-family:var(--avenirMedium);
     font-size:0.75em;
     margin-top:7px;
  }

  &__empty-icon {
    width: 220px;
    height: 200px;
  }
}
</style>