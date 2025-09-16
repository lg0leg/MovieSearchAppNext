import { ResponsiveBar } from '@nivo/bar';

const GenresBar = ({ data, handler }) => (
  <ResponsiveBar
    data={data}
    keys={['count']}
    indexBy="genre"
    layout="horizontal"
    sortBy="value"
    sortAscending={false}
    margin={{ top: 20, right: 20, bottom: 10, left: 120 }}
    padding={0.3}
    colors={({ index }) => {
      // const customColors = ['#9854F6', '#BD93F7', '#D1B4F8', '#E5D5FA', '#F2ECFA'];
      const customColors = ['#F2ECFA', '#E5D5FA', '#D1B4F8', '#BD93F7', '#9854F6'];
      return customColors[index % customColors.length];
    }}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisBottom={null}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,

      renderTick: (tick) => (
        <text
          x={tick.x - 8}
          y={tick.y}
          textAnchor="end"
          dominantBaseline="middle"
          style={{
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          {tick.value}
        </text>
      ),
    }}
    theme={{
      labels: {
        text: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
    }}
    labelTextColor={{ from: 'color', modifiers: [['brighter', 2.5]] }}
    animate={true}
    motionConfig="gentle"
    hoverTarget="bar"
    borderRadius={8}
    onClick={(node) => {
      const { id, genre, count, color } = node.data;
      handler(id);
    }}
    onMouseEnter={(_, event) => {
      event.currentTarget.style.cursor = 'pointer';
    }}
    // enableGridY={false}
  />
);

export default GenresBar;
