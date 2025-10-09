import { useEffect, useState } from "react";
import { useStartTimerMutation,  useStopTimerMutation} from "../../routes/timeEntries/timeEntriesApi";
import Button from "../shared/Button";
import { BOX_TITLE_STYLING, BOX_CONTAINER_STYLING, INPUT_STYLING, INPUT_CONTAINER_STYLE} from "../../utils/commonStyles";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faStopwatch20 } from "@fortawesome/free-solid-svg-icons";



export const NewTimeEntry = () => {
  const [startTimer] = useStartTimerMutation();
  const [stopTimer] = useStopTimerMutation();
  const [entryId, setEntryId] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [notes, setNotes] = useState('');
  const projectId = useParams().id;
  
  
  const handleStart = async (e) => {
    e.preventDefault();

    const payload = {
      projectId: projectId,
      notes: notes,
    }
    console.log('payload', payload);

    try {
      const entry = await startTimer(payload).unwrap();
      console.log('entry', entry);
      setEntryId(entry.id);
    } catch (err) {
      console.error(err);
    }
  };
  async function handleStop(entryId) {
    await stopTimer(entryId);
    setEntryId(null);
    setNotes('');    
  }

  useEffect(() => {
    !entryId ? setButtonDisabled(true) : setButtonDisabled(false);
  }, [entryId]);

  return (
    <div className="flex sm:mx-auto sm:w-full sm:max-w-6xl p-6 lg:px-8">
      <div className={BOX_CONTAINER_STYLING}>
        <div>
          <h2 className={BOX_TITLE_STYLING}>Start New Task</h2>
        </div>

        <div className="flex sm:mx-auto sm:w-full sm:max-w-6xl p-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-6xl lg:px-8 w-full">
            <form onSubmit={handleStart}>
              <div className={INPUT_CONTAINER_STYLE}>
                <input
                  id="notes"
                  name="notes"
                  type="text"
                  value={notes}
                  placeholder="Task Title - be descriptive"
                  onChange={(e) => setNotes(e.target.value)}
                  className={INPUT_STYLING}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  isLoading={false}
                  onClick={handleStart}
                  type="submit"
                  className="mr-5 mt-2 px-5 py-2  rounded-xl bg-emerald-800 text-gray-300 dark:hover:bg-emerald-600 disabled:bg-gray-600 disabled:text-gray-200 disabled:opacity-50 flex gap-2 items-center"
                  icon={<FontAwesomeIcon icon={faStopwatch} />}
                  title="Start"
                  disabled={!buttonDisabled}
                />
                <div className="inline ">
                  <Button
                    isLoading={false}
                    disabled={buttonDisabled}
                    onClick={() => handleStop(entryId)}
                    type="button"
                    className=" mt-2 px-6 py-2 rounded-xl bg-red-800 text-gray-300 dark:hover:bg-red-600 disabled:bg-red-600 disabled:text-gray-200 disabled:opacity-40 flex gap-2 items-center"
                    icon={<FontAwesomeIcon icon={faStopwatch} />}
                    title="Stop"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
