import { ResponsivePie } from '@nivo/pie';

const RatingPie = ({ data, handler }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
    innerRadius={0.4}
    padAngle={4}
    cornerRadius={6}
    activeOuterRadiusOffset={8}
    // colors={{ scheme: 'purples' }}
    // colors={['#9854F6', '#BD93F7', '#D1B4F8', '#E5D5FA', '#F2ECFA']}
    colors={(d) => {
      if (d.id > 8) return '#9854F6';
      if (d.id > 6) return '#BD93F7';
      if (d.id > 4) return '#D1B4F8';
      if (d.id > 2) return '#E5D5FA';
      return '#F2ECFA';
    }}
    arcLabel="id"
    // arcLabel={(e) => `${e.id} (${e.value})`}
    arcLabelsRadiusOffset={0.7}
    enableArcLinkLabels={false}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    // arcLabelsTextColor="#ffffff"
    arcLabelsTextColor={{ from: 'color', modifiers: [['brighter', 2.5]] }}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        symbolShape: 'circle',
      },
    ]}
    theme={{
      labels: {
        text: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
    }}
    onClick={(node) => {
      const { id, value, color, data } = node;
      handler(id);
    }}
  />
);

export default RatingPie;
