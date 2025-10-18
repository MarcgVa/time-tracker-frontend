import { useState } from "react";
import Button from "../../Shared/components/Button";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { useStartTimerMutation } from "../../Shared/routes/timeEntriesApi";

export const StartTimeEntry = () => {
  const [startTimerApi] = useStartTimerMutation();
  const [notes, setNotes] = useState("");
  const projectId = useParams().id;

  const handleStart = async (e) => {
    e.preventDefault();

    const payload = {
      projectId: projectId,
      notes: notes,
    };
    try {
      const entry = await startTimerApi(payload).unwrap();
      console.log("entry", entry);
      setNotes("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex justify-start items-center py-1 mt-12">
      <div className="flex flex-row justify-center items-center gap-2 py-4 mx:auto w-full">
        <div className="flex w-105 h-6 ml-5 rounded-md shadow-xs shadow-blue-700 ">
          <input
            id="notes"
            name="notes"
            type="text"
            value={notes}
            placeholder="Task Name / Note"
            onChange={(e) => setNotes(e.target.value)}
            className="shadow w-105 h-6 rounded-md px-2 text-sm text-blue-400 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-blue-800/50"
          />
        </div>
        <div className="flex">
          <Button
            onClick={handleStart}
            type="submit"
            className={
              "mr-5 mt-2 ml-5 px-5 py-1 text-xs rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex gap-2 items-center cursor-pointer font-medium shadow-lg transition"
            }
            icon={<FontAwesomeIcon icon={faStopwatch} />}
            title={"Start"}
          />
        </div>
      </div>
    </section>
  );
};
