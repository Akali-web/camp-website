import { useState, useRef, useEffect } from 'react';

interface DateInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: Date;
  required?: boolean;
  placeholder?: string;
}

export default function DateInput({
  label,
  name,
  value,
  onChange,
  minDate,
  required = false,
  placeholder = 'dd.mm.rrrr',
}: DateInputProps) {
  const [focused, setFocused] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const inputRef = useRef<HTMLInputElement>(null);

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const parseDate = (dateStr: string): Date | null => {
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d.]/g, '');

    // Auto-format with dots
    if (val.length === 2 && !val.includes('.')) {
      val = val + '.';
    } else if (val.length === 5 && val.split('.').length === 2) {
      val = val + '.';
    }

    onChange(val);
  };

  const handleDateSelect = (date: Date) => {
    onChange(formatDate(date));
    setShowCalendar(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1); i++) {
      days.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateDisabled = (date: Date | null): boolean => {
    if (!date) return true;
    if (!minDate) return false;

    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const compareMin = new Date(minDate);
    compareMin.setHours(0, 0, 0, 0);

    return compareDate < compareMin;
  };

  const monthNames = [
    'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
  ];

  const dayNames = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <label className="text-sm text-slate-700 space-y-2 block">
        <span className="font-semibold">
          {label} {required && <span className="text-red-600">*</span>}
        </span>
        <div className="relative">
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleInputChange}
            onFocus={() => {
              setFocused(true);
              setShowCalendar(true);
            }}
            placeholder={placeholder}
            maxLength={10}
            autoComplete="off"
            required={required}
            className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[var(--stone)] focus:border-[var(--forest)] focus:ring-2 focus:ring-[var(--moss)]/30 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--forest)] hover:text-[var(--forest-dark)] transition-colors"
          >
            <i className="fa-solid fa-calendar text-lg"></i>
          </button>
        </div>
      </label>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div className="absolute z-50 mt-2 bg-white border-2 border-[var(--stone-dark)] rounded-2xl shadow-2xl p-4 min-w-[300px]">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
              className="p-2 hover:bg-[var(--sand)] rounded-lg transition-colors"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <span className="font-bold text-[var(--forest)]">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
              className="p-2 hover:bg-[var(--sand)] rounded-lg transition-colors"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-slate-600 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="p-2"></div>;
              }

              const disabled = isDateDisabled(date);
              const isToday =
                date.toDateString() === new Date().toDateString();
              const isSelected =
                value && parseDate(value)?.toDateString() === date.toDateString();

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !disabled && handleDateSelect(date)}
                  disabled={disabled}
                  className={`
                    p-2 text-sm rounded-lg transition-all
                    ${disabled
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'hover:bg-[var(--moss)]/20 cursor-pointer'
                    }
                    ${isToday ? 'font-bold text-[var(--forest)]' : ''}
                    ${isSelected ? 'bg-[var(--forest)] text-white hover:bg-[var(--forest-dark)]' : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
