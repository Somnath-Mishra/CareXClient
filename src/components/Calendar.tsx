import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { appointmentService } from "../utils/appointment.service";


function fetchHighlightedDaysFromAppointment(date: Dayjs, { signal }: { signal: AbortSignal },userRole:string) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(async() => {

      const upcomingAppointmentDetails=await appointmentService.getUpcomingAppointmentDetails();
      const daysToHighlight=[];
      const currentDate=new Date();
      const currentMonth=currentDate.getMonth();
      const currentYear=currentDate.getFullYear();

      upcomingAppointmentDetails.data.data.forEach(item=>{
        const startTime=new Date(item.startTime);
        if(startTime.getMonth()===currentMonth && startTime.getFullYear()===currentYear){
          daysToHighlight.push(startTime.getDate());
        }
      })


      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs(new Date());

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] },userRole:string
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;
    
    const emoji = userRole === "user" ? "🩺" : "🏥";

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? emoji : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function Calendar(userRole:string) {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fetchHighlightedDaysFromAppointment(
      date,
      {
        signal: controller.signal,
      },
      userRole
    )
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}
