import React from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';

const FormattedDate = ({ dateString }) => {
  let date;

  try {
    date = parseISO(dateString);
  } catch (error) {
    console.error('Invalid date string', error);
    return null;
  }

  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};

FormattedDate.propTypes = {
  dateString: PropTypes.string.isRequired,
};

export default FormattedDate;

// to format the date