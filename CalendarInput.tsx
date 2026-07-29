import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarInputProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  time: string;
  setTime: (time: string) => void;
}

const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export function CalendarInput({ date, setDate, time, setTime }: CalendarInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(date ? new Date(date.getFullYear(), date.getMonth(), 1) : new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isSelected = (day: number) => {
    if (!date) return false;
    return date.getDate() === day && date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear();
  };

  const handleDateSelect = (day: number) => {
    setDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  const formattedDate = date ? `${date.getDate().toString().padStart(2, '0')} ${MONTHS[date.getMonth()]} ${date.getFullYear()}` : '';

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date Selector */}
        <div 
          className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm transition-colors bg-[#f8f9fa] flex items-center justify-between cursor-pointer hover:border-black/30"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={date ? "text-black" : "text-black/50"}>
            {date ? formattedDate : "Date souhaitée"}
          </span>
          <CalendarIcon className="w-4 h-4 text-black/50" />
        </div>

        {/* Time Selector */}
        <div className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm transition-colors bg-[#f8f9fa] flex items-center justify-between">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-black"
            style={{ colorScheme: 'light' }}
          />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+8px)] left-0 z-50 w-full sm:w-[320px] bg-white border border-black/10 rounded-xl shadow-xl p-4"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={handlePrevMonth} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-black/70" />
              </button>
              <span className="text-sm font-bold uppercase tracking-wider text-black">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button onClick={handleNextMonth} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                <ChevronRight className="w-5 h-5 text-black/70" />
              </button>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(day => (
                <div key={day} className="text-center text-[10px] font-bold uppercase text-black/40">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => (
                <div key={idx} className="aspect-square flex items-center justify-center">
                  {day ? (
                    <button
                      onClick={() => handleDateSelect(day)}
                      className={`w-8 h-8 rounded-full text-xs transition-all flex items-center justify-center
                        ${isSelected(day) 
                          ? 'bg-black text-white font-bold scale-110' 
                          : isToday(day)
                            ? 'border border-black/20 text-black font-semibold'
                            : 'text-black/80 hover:bg-black/5 hover:text-black'
                        }
                      `}
                    >
                      {day}
                    </button>
                  ) : (
                    <div className="w-8 h-8" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-black/5 text-right">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[10px] font-bold uppercase tracking-widest text-black hover:opacity-50 transition-opacity"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
