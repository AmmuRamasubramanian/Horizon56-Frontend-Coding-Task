import { defineStore } from 'pinia'

interface Assignment {
  id: number
  title: string,
  status: 'Draft' | 'Approved' | 'Active' | 'Completed'
  remarks: string
}

export const useAssignmentstore=defineStore('assignments', {
  state:()=>({
    assignments:[
      { 
        id: 11, 
        title: 'Drilling operations tracking (depth, pressure, rate)',  
        status: 'Draft', 
        remarks: 'Initial draft created, awaiting internal review.' 
      },
      { 
        id: 22, 
        title: 'Real-time rig monitoring (IoT sensors)', 
        status: 'Approved',
        remarks: 'Reviewed and approved by supervisor. Ready for execution.' 
      },
      { 
        id: 33, 
        title: 'Preventive & predictive maintenance', 
        status: 'Active',
        remarks: 'Implementation in progress. Monitoring system performance.' 
      },
      { 
        id: 44, 
        title: 'Downtime tracking', 
        status: 'Completed',
        remarks: 'Task completed successfully. Final report submitted.' 
      },
    ] as Assignment[]
  }),
  actions:{
    updateStatus(id:number, remarks:string, title:Assignment['status']){
      const item=this.assignments.find(a=>a.id===id)
      if(item){
        item.remarks=remarks
        item.status=title
      }
    }
  }
})