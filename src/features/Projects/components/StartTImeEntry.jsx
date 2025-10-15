import { useState } from "react";
import Button from "../../shared/components/Button";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { useTimeEntry } from "../../shared/hooks/useTimeEntry";



export const StartTimeEntry = () => {
  // const [startTimer] = useStartTimerMutation();
  const [notes, setNotes] = useState("");
  const projectId = useParams().id;
  const { startTime } = useTimeEntry();
  const handleStart = async (e) => {
    e.preventDefault();

    const payload = {
      projectId: projectId,
      notes: notes,
    };
    try {
      // const entry = await startTimer(payload).unwrap();
      const entry = await startTime(payload).unwrap()
      console.log("entry", entry);
      setNotes("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-start items-center py-1 mt-1 bg-gray-300">
      <div className="flex flex-row justify-center items-center gap-2 py-4 mx:auto w-full">
        <div className="flex w-105 h-6 ml-5 rounded-md shadow-lg shadow-gray-600">
          <input
            id="notes"
            name="notes"
            type="text"
            value={notes}
            placeholder="Task Name / Note"
            onChange={(e) => setNotes(e.target.value)}
            className="shadow w-105 h-6 rounded-md px-2 text-sm text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
          />
        </div>
        <div className="flex">
          <Button
            onClick={handleStart}
            type="submit"
            className={
              "mr-5 mt-2 px-3 py-1 text-xs  rounded-xl bg-emerald-800 text-gray-300 dark:hover:bg-emerald-600 flex gap-2 items-center cursor-pointer"
            }
            icon={<FontAwesomeIcon icon={faStopwatch} />}
            title={"Start"}
          />
        </div>
      </div>
    </div>
  );
};
