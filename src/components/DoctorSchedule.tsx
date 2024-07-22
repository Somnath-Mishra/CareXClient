import { useEffect, useState } from "react";
import { avaliableTimeService } from "../utils/avaliableTime.service";
import { Button, Input } from "../components/index";
import { useForm, SubmitHandler } from "react-hook-form";

interface Schedule {
  _id: string;
  startTime: string;
  frequencyTime: number;
}

interface ScheduleFormInputs {
  startTime: string;
  frequencyTime: number;
}

function DoctorSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAvailableTimeForm, setShowAvailableTimeForm] = useState(false);
  const { register, handleSubmit, reset } = useForm<ScheduleFormInputs>();

  useEffect(() => {
    avaliableTimeService
      .getAvaliableTime()
      .then((response) => {
        const fetchedSchedules = response.data;
        setSchedules(fetchedSchedules);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const deleteSchedule = (id: string) => {
    setLoading(true);
    avaliableTimeService
      .deleteAvaliableTime(id)
      .then(() => {
        const updatedSchedules = schedules.filter(
          (schedule) => schedule._id !== id
        );
        setSchedules(updatedSchedules);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const bringScheduleForm = () => {
    setShowAvailableTimeForm(true);
  };

  const createSchedule: SubmitHandler<ScheduleFormInputs> = (data) => {
    setLoading(true);
    avaliableTimeService
      .createAvaliableTime(data.startTime, data.frequencyTime)
      .then((response) => {
        const newSchedule = response.data;
        if (newSchedule) {
          setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
        }
        setLoading(false);
        setError(null);
        setShowAvailableTimeForm(false);
        reset();
      })
      .catch((error) => {
        setError(error.message);
        setShowAvailableTimeForm(false);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Doctor Schedule</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {schedules && schedules.length === 0 && (
        <p>No Available Time. Create Now.</p>
      )}
      {schedules &&
        schedules.map((schedule) => (
          <div key={schedule._id}>
            <p>Date Time: {schedule.startTime}</p>
            <p>Frequency of time in days: {schedule.frequencyTime}</p>
            <Button onClick={() => deleteSchedule(schedule._id)}>Delete</Button>
          </div>
        ))}
      <Button onClick={bringScheduleForm}>New Schedule</Button>
      {showAvailableTimeForm && (
        <>
          <form onSubmit={handleSubmit(createSchedule)}>
            <Input
              label="Date Time"
              type="datetime-local"
              placeholder="Enter Date Time"
              {...register("startTime", { required: true })}
            />
            <Input
              label="Frequency Time"
              type="number"
              placeholder="Enter Frequency of time in days"
              {...register("frequencyTime", { required: true })}
            />
            <Button type="submit">Create</Button>
          </form>
        </>
      )}
    </div>
  );
}

export default DoctorSchedule;
