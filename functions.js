import _ from 'lodash';
import moment from 'moment';
import * as geolib from 'geolib';

/**
 * This function allows to validate if a value is really empty.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} value
 */
export const isEmpty = (value) => {
  const compare = _.trim(value);
  return compare === '' || compare === null || compare === undefined;
};

/**
 * This function validates if two passed
 * @param timeFrom
 * @param timeTo
 * @param format
 * @returns {boolean}
 */
export const isGreaterThen = (timeFrom, timeTo, format = 'HH:mm:ss') => {
  if (!timeFrom || !timeTo) {
    return false;
  }
  const diff = moment(timeTo, format).diff(moment(timeFrom, format), 'seconds');
  return diff < 0;
};

/**
 * This function allows to validate if one of the passed values is empty.
 * @param values
 * @returns {*}
 */
export const oneIsEmpty = (values = []) =>
  values.reduce((empty, currentValue) => {
    if (isEmpty(currentValue)) {
      empty = true;
    }
    return empty;
  }, false);

export const redirectTo = (navigation, route) => {
  // const resetAction = StackActions.reset({
  //   index: 0,
  //   actions: [NavigationActions.navigate({routeName: route})],
  // });
  // navigation.dispatch(resetAction);
};

export const replacheWith = (navigation, route, params) => {
  // const resetAction = StackActions.replace(route, params);
  // navigation.dispatch(resetAction);
};

export const getPassedTime = (dateObj) => {
  const currentDate = moment();
  const diffDays = currentDate.diff(dateObj, 'days', false);
  const diffHours = currentDate.diff(dateObj, 'hours', false);
  const diffMinutes = currentDate.diff(dateObj, 'minutes', false);
  if (diffDays > 0) {
    return `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hrs ago`;
  } else {
    return `${diffMinutes} mins ago`;
  }
};

export const getElapsedTime = (
  start,
  end,
  pieces,
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  const startDate = start ? moment(start, format) : moment();
  const endDate = end ? moment(end, format) : moment();
  const diffDays = Math.abs(startDate.diff(endDate.toDate(), 'days', false));
  const diffHours = Math.abs(startDate.diff(endDate.toDate(), 'hours', false));
  const diffMinutes = Math.abs(
    startDate.diff(endDate.toDate(), 'minutes', false),
  );
  const diffSeconds = Math.abs(
    startDate.diff(endDate.toDate(), 'seconds', false),
  );

  const timePieces = {
    days: diffDays,
    hours: diffHours - diffDays * 24,
    minutes: diffMinutes - diffHours * 60,
    seconds: diffSeconds - diffMinutes * 60,
  };
  if (!pieces) {
    const {days, hours, minutes, seconds} = timePieces;
    if (days > 0) {
      return `${days}d ${hours > 0 ? ` ${hours}h` : ''}`;
    } else if (hours > 0) {
      return `${hours}h ${minutes > 0 ? ` ${minutes}m` : ''}`;
    } else {
      return `${minutes}m ${seconds > 0 ? ` ${seconds}s` : ''}`;
    }
  }
  return timePieces;
};

export const explodeNames = (fullName) => {
  const [firstName, lastName, ...other] = fullName.split(' ');
  return [firstName, lastName + (other ? other.join(' ') : '')];
};

export const getDistance = (from = {}, to = {}) => {
  let distance = false;
  if ((from.lat || !from.lng) && (!to.lat || !to.lng)) {
    return null;
  }
  try {
    distance = geolib.getDistance(
      {
        latitude: from.lat,
        longitude: from.lng,
      },
      {
        longitude: to.lng,
        latitude: to.lat,
      },
      1,
    );
  } catch (err) {
    console.log('Error: ', err);
  }
  return distance;
};

export const formatDistance = (distance = 0, options = {}) => {
  const toKm = (distance / 1000).toFixed(1);
  return `${toKm}Km`;
};

export const upcsf = (string) => string[0].toUpperCase() + string.slice(1);

export const getTrikoAttrs = (triko = {}) => {
  const {user = {}} = triko;
  return JSON.parse(user.attrs || '{}');
};

export const isIn = (value, stack = []) => stack.includes(value);
