import { Card } from '@mui/material';

import PropTypes from 'prop-types';

const BlankCard = ({ children, }) => {
  return (
    <Card
      sx={{ p: 0, position: 'relative' }}
    
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card>
  );
};

BlankCard.propTypes = {
  children: PropTypes.node,
};

export default BlankCard;
