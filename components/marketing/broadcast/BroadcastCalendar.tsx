'use client';

import React from 'react';
import { Card, CardBody, Button, Chip } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { broadcastData } from './data';

export default function BroadcastCalendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getBroadcastsForDay = (day: number) => {
    return broadcastData.filter((broadcast) => {
      const broadcastDate = new Date(broadcast.scheduledFor);
      return (
        broadcastDate.getDate() === day &&
        broadcastDate.getMonth() === currentDate.getMonth() &&
        broadcastDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <Card>
      <CardBody className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              isIconOnly
              variant="light"
              onPress={previousMonth}
            >
              <Icon icon="solar:alt-arrow-left-linear" width={24} />
            </Button>
            <h3 className="text-xl font-semibold">
              {currentDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <Button
              isIconOnly
              variant="light"
              onPress={nextMonth}
            >
              <Icon icon="solar:alt-arrow-right-linear" width={24} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center text-small font-semibold text-default-600"
            >
              {day}
            </div>
          ))}

          {previousMonthDays.map((_, index) => (
            <div
              key={`prev-${index}`}
              className="min-h-[100px] rounded-lg border border-dashed border-default-200 bg-default-50 p-2"
            />
          ))}

          {days.map((day) => {
            const broadcasts = getBroadcastsForDay(day);
            return (
              <div
                key={`day-${day}`}
                className="min-h-[100px] rounded-lg border border-default-200 p-2"
              >
                <div className="mb-2 font-medium">{day}</div>
                <div className="flex flex-col gap-1">
                  {broadcasts.map((broadcast) => (
                    <Chip
                      key={broadcast.id}
                      className="cursor-pointer"
                      color={broadcast.platform === 'facebook' ? 'primary' : 'success'}
                      size="sm"
                      variant="flat"
                    >
                      {broadcast.title}
                    </Chip>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
