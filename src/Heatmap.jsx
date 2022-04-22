import { format } from 'date-fns';
import { useRef } from 'react';

const DAY_INDEXES = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

function formatDayAndHour(chartData) {
  return chartData.reduce((dates, dateString) => {
    const date = new Date(dateString);
    const day = DAY_INDEXES[date.getDay()];
    const hour = format(date, 'haaa');

    (dates[day] = dates[day] || []).push(hour);

    return dates;
  }, {});
}

const generateBackgroundColor = (count) => {
  return `hsl(196deg 36% ${count > 0 ? 95 - count * 5 : 95}%)`;
};

function generateLegend(data) {
  const deduped = [...new Set(data)];
  const minValue = Math.min(...deduped);
  const maxValue = Math.max(...deduped);

  const minColor = generateBackgroundColor(minValue);
  const maxColor = generateBackgroundColor(maxValue);

  return (
    <div className="legend">
      <div
        className="cell"
        style={{
          background: `linear-gradient(90deg, ${minColor} 0%, ${maxColor} 100%)`,
        }}
      />
      <div className="labels">
        <span className="label">{minValue}</span>
        <span className="label">{maxValue}</span>
      </div>
    </div>
  );
}

const Heatmap = ({
  data = [],
  xAxisLabels = [],
  yAxisLabels = [],
  orientation = 'vertical',
}) => {
  const minMaxCount = useRef([]);
  const formattedData = formatDayAndHour(data);
  const gridCells = xAxisLabels.reduce((days, dayLabel) => {
    const dayAndHour = yAxisLabels.reduce((hours, hourLabel) => {
      const count = formattedData[dayLabel]?.reduce((total, hour) => {
        return hour === hourLabel ? total + 1 : total;
      }, 0);
      minMaxCount.current = [...minMaxCount.current, count];
      return [
        ...hours,
        {
          dayHour: `${dayLabel} ${hourLabel}`,
          count,
        },
      ];
    }, []);
    return {
      ...days,
      [dayLabel]: {
        hours: dayAndHour,
      },
    };
  }, {});
  return (
    <div className="container">
      <div className={`heatmap ${orientation}`}>
        {Object.keys(gridCells).map((day) => (
          <div key={day} className="cells col">
            {gridCells[day].hours.map(({ dayHour, count }) => (
              <div
                key={dayHour}
                className="cell"
                style={{ backgroundColor: generateBackgroundColor(count) }}
              >
                <div className="tooltip" role="tooltip">
                  <span className="count">{count}</span>
                  <span>{dayHour}</span>
                </div>
              </div>
            ))}
            <span className="label">{day}</span>
          </div>
        ))}
        <div className="col">
          {yAxisLabels.map((label, index) => (
            <span className="label" key={label}>
              {index % 2 === 0 ? label : null}
            </span>
          ))}
        </div>
      </div>
      {generateLegend(minMaxCount.current)}
    </div>
  );
};

export default Heatmap;
