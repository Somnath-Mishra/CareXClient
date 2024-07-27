
import  { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { appointmentService } from "../utils/appointment.service";
import { CircularProgress, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

interface Props {
  userRole: string;
}

interface appointmentInterface {
  _id: string;
  startTime: string;
  endTime: string;
  location: string;
  mode: string;
  doctorFirstName: string;
  doctorLastName: string;
  patientFirstName: string;
  patientLastName: string;
}

interface FetchHighlightedDaysParams {
  date: Dayjs;
  signal: AbortSignal;
  userRole: string;
}

interface FetchHighlightedDaysResult {
  daysToHighlight: number[];
}

function fetchHighlightedDaysFromAppointment({
  signal,
}: FetchHighlightedDaysParams): Promise<FetchHighlightedDaysResult> {
  return new Promise<FetchHighlightedDaysResult>((resolve, reject) => {
    const timeout = setTimeout(async () => {
      try {
        const upcomingAppointmentDetails =
          await appointmentService.getUpcomingAppointmentDetails();
        const daysToHighlight: number[] = [];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        upcomingAppointmentDetails.data.data.forEach(
          (item: appointmentInterface) => {
            const startTime = new Date(item.startTime);
            if (
              startTime.getMonth() === currentMonth &&
              startTime.getFullYear() === currentYear
            ) {
              daysToHighlight.push(startTime.getDate());
            }
          }
        );

        resolve({ daysToHighlight });
      } catch (error) {
        reject(error);
      }
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs(new Date());

interface ServerDayProps extends PickersDayProps<Dayjs> {
  highlightedDays?: number[];
  userRole: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -2,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function ServerDay(props: ServerDayProps) {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    userRole,
    ...other
  } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;
  const emoji = userRole === "user" ? "🩺" : "🏥";

  return (
    <StyledBadge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? emoji : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </StyledBadge>
  );
}

export default function Calendar({ userRole }: Props) {
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fetchHighlightedDaysFromAppointment({
      date,
      signal: controller.signal,
      userRole,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          position: "relative",
          width: "fit-content",
          margin: "auto",
          mt: 4,
        }}
      >
        <Typography variant="h6" gutterBottom align="center">
          {userRole === "user" ? "User's Calendar" : "Doctor's Calendar"}
        </Typography>
        <DateCalendar
          defaultValue={initialValue}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: (dayProps) => (
              <ServerDay
                {...dayProps}
                userRole={userRole}
                highlightedDays={highlightedDays}
              />
            ),
          }}
        />
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
}
