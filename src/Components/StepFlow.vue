<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAssignmentstore } from '@/store/assignmentStore'
import StepItem from './StepItem.vue'

const store = useAssignmentstore()

interface Step {
  id: number
  title: string
  subtitle: string
  contentHeight: number
}

interface Assignment {
  id: number
  title: string
  status: 'Draft' | 'Approved' | 'Active' | 'Completed'
  remarks: string
}

interface Props {
  withUpdatedVal?: boolean
  selectedassignItem?: Assignment | null
}

const props = defineProps<Props>()

const steps: Step[] = [
  { id: 1, title: 'Draft',     subtitle: 'Pre execution', contentHeight: 140 },
  { id: 2, title: 'Approved',  subtitle: 'Pre execution', contentHeight: 90  },
  { id: 3, title: 'Active',    subtitle: 'In progress',   contentHeight: 110 },
  { id: 4, title: 'Completed', subtitle: 'Done',          contentHeight: 120 },
]

const statusToStepMap: Record<string, number> = {
  Draft: 1,
  Approved: 2,
  Active: 3,
  Completed: 4,
}

const stepToStatusMap: Record<number, Assignment['status']> = {
  1: 'Draft',
  2: 'Approved',
  3: 'Active',
  4: 'Completed',
}

const activeStepId = ref<number>(1)

watch(
  () => props.selectedassignItem?.status,
  (newStatus) => {
    activeStepId.value = statusToStepMap[newStatus ?? 'Draft'] ?? 1
  },
  { immediate: true }
)

function activateStep(id: number) {
  activeStepId.value = id
  if (props.withUpdatedVal === true) {
    const statusValue = stepToStatusMap[id] ?? 'Draft'
    store.updateStatus(props.selectedassignItem?.id,'', statusValue)
  }
}

const remarksMap = computed(() => {
  const map: Record<number, string> = {}

  const freshItem = props.withUpdatedVal && props.selectedassignItem
    ? store.assignments.find(a => a.id === props.selectedassignItem?.id)
    : null

  steps.forEach(step => {
    if (freshItem && step.title === freshItem.status) {
      map[step.id] = freshItem.remarks || ''
    } else {
      map[step.id] = ''
    }
  })

  return map
})
</script>

<template>
  <div class="step-flow">
    <StepItem
      v-for="(step, index) in steps"
      :key="step.id"
      :id="step.id"
      :title="step.title"
      :subtitle="step.subtitle"
      :remarks="remarksMap[step.id]"
      :contentHeight="step.contentHeight"
      :isLast="index === steps.length - 1"
      :isActive="step.id === activeStepId"
      :withUpdatedVal="props.withUpdatedVal"
      :selectedassignItemId="props.withUpdatedVal ? props.selectedassignItem?.id : null"
      @activate="activateStep(step.id)"
    />
  </div>
</template>

<style scoped lang="scss">
.step-flow {
  background-color: var(--veryDrkGreyishBlue);
  border-radius: 8px;
  padding: 18px 14px;
  border: 0.8px solid var(--lighterAshBlue);
  display: flex;
  flex-direction: column;
  width: 382px;

  @media (max-width: 500px) {
    width: 100%;
  }
}
</style>