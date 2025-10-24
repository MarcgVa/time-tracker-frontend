import React, { useState, useEffect} from 'react'
import { useGetDailyActivityQuery } from '../routes/timeEntriesApi';

import DataTable from '../../Shared/components/DataTable';
import Table from './Table';



export const ActivityList = ({ id }) => {
  
  const [activity, setActivity] = useState([]);
  const { status, data } = useGetDailyActivityQuery(id);

  useEffect(() => {
    if (status === 'fulfilled') {
      setActivity(data);
    }
  }, [status, data])
  
  return (
    <>
      <section className="flex flex-col ml-7 mt-6">
        <div>
          <h1 className="font-semibold text-2xl">Today's Activity </h1>
        </div>
        <div>
          
          <Table data={activity} />
        </div>

      </section>
    </>
  );
}
