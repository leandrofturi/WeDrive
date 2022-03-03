import PropTypes from 'prop-types';
// @mui
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { fDateTime } from '../../utils/formatTime';
// _mock_
import { _appTimeline } from '../../_mock';

// ----------------------------------------------------------------------

export default function AppTimeline() {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none',
        },
      }}
    >
      <CardHeader title="Últimos trajetos" />
      <CardContent>
        <Timeline>
          {_appTimeline.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === _appTimeline.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

function OrderItem({ item, isLast }) {
  const { color, title, time, duration } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={color}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}<br />{`${duration} minutos`}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
