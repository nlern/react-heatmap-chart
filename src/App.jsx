import React from 'react';
import Heatmap from './Heatmap';
import { data } from './data.js';

import './App.css';

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hourLabels = [
  '12am',
  '1am',
  '2am',
  '3am',
  '4am',
  '5am',
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm',
];

function App() {
  return (
    <>
      <div className="container">
        <Heatmap
          orientation="vertical"
          data={data}
          xAxisLabels={dayLabels}
          yAxisLabels={hourLabels}
        />
      </div>
      <div className="container">
        <Heatmap
          orientation="horizontal"
          data={data}
          xAxisLabels={dayLabels}
          yAxisLabels={hourLabels}
        />
      </div>
    </>
  );
}

export default App;
