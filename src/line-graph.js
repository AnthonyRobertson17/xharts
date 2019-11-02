import React from 'react';
import { ResponsiveLine } from '@nivo/line'

const data = [
  {
    "id": "japan",
    "color": "hsl(112, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 49
      },
      {
        "x": "helicopter",
        "y": 252
      },
      {
        "x": "boat",
        "y": 244
      },
      {
        "x": "train",
        "y": 231
      },
      {
        "x": "subway",
        "y": 243
      },
      {
        "x": "bus",
        "y": 151
      },
      {
        "x": "car",
        "y": 112
      },
      {
        "x": "moto",
        "y": 264
      },
      {
        "x": "bicycle",
        "y": 170
      },
      {
        "x": "horse",
        "y": 99
      },
      {
        "x": "skateboard",
        "y": 299
      },
      {
        "x": "others",
        "y": 219
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(145, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 86
      },
      {
        "x": "helicopter",
        "y": 171
      },
      {
        "x": "boat",
        "y": 29
      },
      {
        "x": "train",
        "y": 171
      },
      {
        "x": "subway",
        "y": 37
      },
      {
        "x": "bus",
        "y": 256
      },
      {
        "x": "car",
        "y": 3
      },
      {
        "x": "moto",
        "y": 295
      },
      {
        "x": "bicycle",
        "y": 252
      },
      {
        "x": "horse",
        "y": 235
      },
      {
        "x": "skateboard",
        "y": 256
      },
      {
        "x": "others",
        "y": 69
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(345, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 225
      },
      {
        "x": "helicopter",
        "y": 23
      },
      {
        "x": "boat",
        "y": 0
      },
      {
        "x": "train",
        "y": 216
      },
      {
        "x": "subway",
        "y": 186
      },
      {
        "x": "bus",
        "y": 104
      },
      {
        "x": "car",
        "y": 145
      },
      {
        "x": "moto",
        "y": 282
      },
      {
        "x": "bicycle",
        "y": 272
      },
      {
        "x": "horse",
        "y": 95
      },
      {
        "x": "skateboard",
        "y": 101
      },
      {
        "x": "others",
        "y": 67
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(293, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 245
      },
      {
        "x": "helicopter",
        "y": 251
      },
      {
        "x": "boat",
        "y": 55
      },
      {
        "x": "train",
        "y": 118
      },
      {
        "x": "subway",
        "y": 23
      },
      {
        "x": "bus",
        "y": 167
      },
      {
        "x": "car",
        "y": 47
      },
      {
        "x": "moto",
        "y": 23
      },
      {
        "x": "bicycle",
        "y": 118
      },
      {
        "x": "horse",
        "y": 50
      },
      {
        "x": "skateboard",
        "y": 100
      },
      {
        "x": "others",
        "y": 131
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(72, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 280
      },
      {
        "x": "helicopter",
        "y": 50
      },
      {
        "x": "boat",
        "y": 48
      },
      {
        "x": "train",
        "y": 207
      },
      {
        "x": "subway",
        "y": 200
      },
      {
        "x": "bus",
        "y": 209
      },
      {
        "x": "car",
        "y": 284
      },
      {
        "x": "moto",
        "y": 218
      },
      {
        "x": "bicycle",
        "y": 32
      },
      {
        "x": "horse",
        "y": 260
      },
      {
        "x": "skateboard",
        "y": 276
      },
      {
        "x": "others",
        "y": 298
      }
    ]
  }
];

const MyResponsiveLine = () => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    colors={{ scheme: 'nivo' }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
);

class LineGraph extends React.Component {
  render() {
    return (
      <div style={{ height: '400px' }}>
        <MyResponsiveLine />
      </div>
    )
  }
}

export default LineGraph;