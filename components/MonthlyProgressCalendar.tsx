const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function dateKey(year: number, month: number, day: number) {
  return [
    year,
    String(month + 1).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join('-');
}

export default function MonthlyProgressCalendar({
  activityDates,
  now,
}: {
  activityDates: string[];
  now: string;
}) {
  const today = new Date(now);
  const year = today.getUTCFullYear();
  const month = today.getUTCMonth();
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const todayKey = dateKey(year, month, today.getUTCDate());
  const completedDates = new Set(activityDates);
  const monthLabel = new Intl.DateTimeFormat('en-AU', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(today);
  const activeDays = Array.from(completedDates).filter(date =>
    date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`),
  ).length;

  return (
    <section className="monthly-calendar" aria-label={`Learning activity for ${monthLabel}`}>
      <div className="calendar-heading">
        <div>
          <p className="tiny eyebrow">MONTHLY PROGRESS</p>
          <h3>{monthLabel}</h3>
        </div>
        <span className="tiny">{activeDays} active {activeDays === 1 ? 'day' : 'days'}</span>
      </div>
      <div className="calendar-grid" aria-hidden="true">
        {weekdays.map((day, index) => <span className="calendar-weekday" key={`${day}-${index}`}>{day}</span>)}
        {Array.from({ length: firstWeekday }, (_, index) => <span key={`blank-${index}`} />)}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const key = dateKey(year, month, day);
          const complete = completedDates.has(key);
          return (
            <span
              key={key}
              className={`calendar-day ${complete ? 'complete' : ''} ${key === todayKey ? 'today' : ''}`}
              title={`${key}${complete ? ': learning activity recorded' : ''}`}
            >
              {day}
            </span>
          );
        })}
      </div>
      <div className="calendar-legend tiny"><span /> Practice or lesson activity</div>
    </section>
  );
}
