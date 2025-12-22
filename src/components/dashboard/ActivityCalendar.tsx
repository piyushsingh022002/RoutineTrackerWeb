import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import type { ActivityLog } from '../../types';
import { Card } from '../common';

interface ActivityCalendarProps {
  activityLogs: ActivityLog[];
  month?: Date;
}

const CalendarContainer = styled(Card)`
  width: 100%;
  padding: 1rem 1rem 1.25rem 1rem;
  box-sizing: border-box;
  overflow: hidden; /* keep all inner visuals inside the card */
  background-color: var(--bg-light);
  color: var(--text-color);
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const MonthTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Weekday = styled.div`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-light);
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
  min-width: 0; /* avoid grid overflow */
`;

const DayCell = styled(motion.div)<{ $isCurrentMonth: boolean; $isToday: boolean }>`
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: ${(props) => (props.$isToday ? '600' : '400')};
  color: ${(props) => {
    if (!props.$isCurrentMonth) return 'var(--text-light)';
    if (props.$isToday) return '#fff';
    return 'var(--text-color)';
  }};
  background-color: ${(props) => (props.$isToday ? 'var(--primary-color)' : 'transparent')};
  border: ${(props) => (props.$isToday ? 'none' : '1px solid var(--border-color)')};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${(props) => (props.$isToday ? 'var(--primary-hover)' : 'var(--calendar-chip-hover)')};
  }
`;

const StreakIndicator = styled.div<{ $streakCount: number }>`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) => {
    if (props.$streakCount >= 7) return 'var(--secondary-color)';
    if (props.$streakCount >= 3) return 'var(--primary-color)';
    return 'var(--text-light)';
  }};
  color: #fff;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayCellWrapper = styled.div`
  position: relative;
`;

const Dot = styled.div<{ $color: string }>`
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(p) => p.$color};
  box-shadow: 0 0 0 1px var(--bg-light);
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.75rem;
  row-gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-light);
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: 1px solid var(--border-color);
`;

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  activityLogs,
  month = new Date(),
}) => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = monthStart.getDay();
  
  // Create an array of days to display, including padding days from previous and next months
  const calendarDays = [];
  
  // Add padding days from previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the current month
  calendarDays.push(...daysInMonth);
  
  // Add padding days from next month to complete the grid
  const remainingDays = 7 - (calendarDays.length % 7);
  if (remainingDays < 7) {
    for (let i = 0; i < remainingDays; i++) {
      calendarDays.push(null);
    }
  }
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  const getActivityForDay = (day: Date | null) => {
    if (!day) return null;
    
    return activityLogs.find((log) => {
      const logDate = new Date(log.date);
      return isSameDay(logDate, day);
    });
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <MonthTitle>{format(month, 'MMMM yyyy')}</MonthTitle>
      </CalendarHeader>
      
      <WeekdaysRow>
        {weekdays.map((weekday) => (
          <Weekday key={weekday}>{weekday}</Weekday>
        ))}
      </WeekdaysRow>
      
      <DaysGrid>
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} />;
          }
          
          const activity = getActivityForDay(day);
          const isToday = isSameDay(day, today);
          const hasActivity = !!activity?.hasNote;
          const isPast = day < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          
          return (
            <DayCellWrapper key={day.toString()}>
              <DayCell
                $isCurrentMonth={true}
                $isToday={isToday}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
              >
                {format(day, 'd')}
              </DayCell>
              {hasActivity && <Dot $color="var(--secondary-color)" />}
              {!hasActivity && isPast && !isToday && <Dot $color="var(--danger-color)" />}
              {activity && activity.streakCount > 1 && (
                <StreakIndicator $streakCount={activity.streakCount}>
                  {activity.streakCount}
                </StreakIndicator>
              )}
            </DayCellWrapper>
          );
        })}
      </DaysGrid>
      
      <Legend>
        <LegendItem>
          <LegendColor $color="var(--secondary-color)" />
          <span>Note Added</span>
        </LegendItem>
        <LegendItem>
          <LegendColor $color="var(--primary-color)" />
          <span>Today</span>
        </LegendItem>
        <LegendItem>
          <LegendColor $color="var(--danger-color)" />
          <span>No Note (past)</span>
        </LegendItem>
        <LegendItem>
          <LegendColor $color="var(--secondary-color)" />
          <span>Streak (7+ days)</span>
        </LegendItem>
        <LegendItem>
          <LegendColor $color="var(--primary-color)" />
          <span>Streak (3-6 days)</span>
        </LegendItem>
      </Legend>
    </CalendarContainer>
  );
};

export default ActivityCalendar;
