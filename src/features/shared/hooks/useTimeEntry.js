import { useStartTimerMutation, useStopTimerMutation } from '../routes/timeEntriesApi'

import React from 'react'

export const useTimeEntry = ({payload,id}) => {

  if (!id && !payload.projectId) { throw new Error("Project Id is required"); }
  
  const [startTimeApi] = useStartTimerMutation();
  const [stopTimeApi] = useStopTimerMutation();

  
  const startTime = async (payload) => {
    try {
      const results = await startTimeApi(payload).unwrap();
      return results;
    } catch (err) {
      console.error("Failed to start timer!", err);
      throw new Error(err);
    }  
  };
  
  const stopTime = async (id) => {
    try {
      const results = await stopTimeApi(id).unwrap();
      return results; 
    } catch (err) {
      console.error("Failed to stop timer!", err);
      throw new Error(err);
      
    }
  };
  
  return {
    startTime,
    stopTime,
  }
}
