import React from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import { withState, withHandlers, compose } from 'recompose';
import PropTypes from 'prop-types';

const arrayFromMinMax = (min, max, step = 1) => {
  const arr = [];
  const totalSteps = Math.floor((max - min) / step);
  for (let ii = 0; ii <= totalSteps; ii++) {
    arr.push(ii * step + min);
  }
  return arr;
};

const ScoreScale = ({
  min, max, selected, handleSelected
}) => {
  const scale = arrayFromMinMax(min, max);
  return (
    <ButtonToolbar className="float-right">
      <ButtonGroup className="mr-2">
        {scale.map(value => (
          <Button
            key={value}
            outline={selected !== value}
            color="primary"
            value={value}
            onClick={handleSelected}
          >
            {value}
          </Button>
        ))}
      </ButtonGroup>
    </ButtonToolbar>
  );
};

ScoreScale.defaultProps = {
  selected: undefined
};
ScoreScale.propTypes = {
  selected: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  handleSelected: PropTypes.func.isRequired
};

export default compose(
  withState('selected', 'setSelected', ({ selected }) => selected),
  withHandlers({
    handleSelected: ({ index, setSelected, updateForm }) => ({ target: { value } }) => {
      const selected = parseInt(value, 10);
      setSelected(selected);
      updateForm(index)(selected);
    }
  })
)(ScoreScale);
