
import { useEffect, useState } from "react";
import { avaliableTimeService } from "../utils/avaliableTime.service";
import {
  Button,
  TextField,
  CircularProgress,
  Typography,
  Box,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

interface Schedule {
  _id: string;
  startTime: string;
  frequencyTime: number;
  mode: string;
  location: string;
}

interface ScheduleFormInputs {
  startTime: string;
  frequencyTime: number;
  mode: string;
  location: string;
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
      .createAvaliableTime(data.startTime, data.frequencyTime,data.mode,data.location)
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
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Schedule
      </Typography>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}
      {!loading && schedules.length === 0 && (
        <Typography>No Available Time. Create Now.</Typography>
      )}
      <Grid container spacing={2}>
        {schedules.map((schedule) => (
          <Grid item xs={12} key={schedule._id}>
            <Paper sx={{ p: 2 }}>
              <Typography>Date Time: {schedule.startTime}</Typography>
              <Typography>
                Frequency of time in days: {schedule.frequencyTime}
              </Typography>
              <Typography>Mode: {schedule.mode}</Typography>
              <Typography>Location: {schedule.location}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteSchedule(schedule._id)}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={bringScheduleForm}
        sx={{ mt: 3 }}
      >
        New Schedule
      </Button>
      {showAvailableTimeForm && (
        <Box
          component="form"
          onSubmit={handleSubmit(createSchedule)}
          sx={{ mt: 3 }}
        >
          <TextField
            label="Date Time"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("startTime", { required: true })}
          />
          <TextField
            label="Frequency Time"
            type="number"
            fullWidth
            margin="normal"
            {...register("frequencyTime", { required: true })}
          />
          <TextField
            label="Mode"
            select
            fullWidth
            margin="normal"
            {...register("mode", { required: true })}
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select Mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </TextField>
          <TextField
            label="Location"
            type="text"
            fullWidth
            margin="normal"
            {...register("location", { required: true })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Create
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default DoctorSchedule;
