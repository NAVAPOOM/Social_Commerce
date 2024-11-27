'use client';

import React from 'react';
import { Switch, Input } from '@nextui-org/react';
import { BusinessHours } from './data';

interface BusinessHoursEditorProps {
  initialHours?: BusinessHours[];
}

const defaultHours: BusinessHours[] = [
  { day: 'Monday', open: '09:00', close: '18:00', isOpen: true },
  { day: 'Tuesday', open: '09:00', close: '18:00', isOpen: true },
  { day: 'Wednesday', open: '09:00', close: '18:00', isOpen: true },
  { day: 'Thursday', open: '09:00', close: '18:00', isOpen: true },
  { day: 'Friday', open: '09:00', close: '18:00', isOpen: true },
  { day: 'Saturday', open: '10:00', close: '17:00', isOpen: true },
  { day: 'Sunday', open: '10:00', close: '17:00', isOpen: false },
];

export default function BusinessHoursEditor({
  initialHours = defaultHours,
}: BusinessHoursEditorProps) {
  const [hours, setHours] = React.useState<BusinessHours[]>(initialHours);

  const handleTimeChange = (
    index: number,
    field: 'open' | 'close',
    value: string
  ) => {
    const newHours = [...hours];
    newHours[index] = { ...newHours[index], [field]: value };
    setHours(newHours);
  };

  const handleToggle = (index: number) => {
    const newHours = [...hours];
    newHours[index] = { ...newHours[index], isOpen: !newHours[index].isOpen };
    setHours(newHours);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-medium font-semibold">Business Hours</h3>
      <div className="space-y-3">
        {hours.map((hour, index) => (
          <div
            key={hour.day}
            className="flex items-center gap-4 rounded-lg border border-default-200 p-4"
          >
            <div className="w-32">
              <p className="font-medium">{hour.day}</p>
            </div>
            <Switch
              isSelected={hour.isOpen}
              size="sm"
              onValueChange={() => handleToggle(index)}
            />
            <div className="flex flex-1 items-center gap-4">
              <Input
                isDisabled={!hour.isOpen}
                label="Open"
                placeholder="09:00"
                size="sm"
                type="time"
                value={hour.open}
                variant="bordered"
                onChange={(e) =>
                  handleTimeChange(index, 'open', e.target.value)
                }
              />
              <Input
                isDisabled={!hour.isOpen}
                label="Close"
                placeholder="18:00"
                size="sm"
                type="time"
                value={hour.close}
                variant="bordered"
                onChange={(e) =>
                  handleTimeChange(index, 'close', e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}