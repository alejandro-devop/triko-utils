import Crypto from 'crypto-js';
import {SSN_SECRET, SSN_MESSAGE} from 'react-native-dotenv';

/**
 * this chars works as a tip to mislead jerks
 * @type {*[]}
 */
const maskChars = ['%', '=', '&'];
/**
 * This function encrypts a string to base64 and returns i'ts output.
 * @param stringToEncode
 * @returns {*}
 */
const encode = (stringToEncode) => {
  const wordArray = Crypto.enc.Utf8.parse(stringToEncode);
  return Crypto.enc.Base64.stringify(wordArray);
};

/**
 * This function decodes a base 64 encrypted string.
 * @param stringToDecode
 * @returns {string}
 */
const decode = (stringToDecode) => {
  const parsedWordArray = Crypto.enc.Base64.parse(stringToDecode);
  return parsedWordArray.toString(Crypto.enc.Utf8);
};

/**
 * This function allows to reserve a given string.
 * @param string
 * @returns {*}
 */
const reverseString = (string) => string.split('').reverse().join('');

/**
 * This function allows to encrypt given data.
 * @param data
 * @returns {*}
 */
export const encryptData = (data) => {
  const mainBase64 = encode(JSON.stringify(data));
  const breakPoint = Math.floor(mainBase64.length / 2);
  const firstHalf = mainBase64.substring(0, breakPoint);
  const secondHalf = mainBase64.substring(breakPoint);
  const getMask = (i) => `${SSN_SECRET}${maskChars[i]}`;
  const encryptedData = JSON.stringify({
    data: reverseString(
      `${getMask(0)}${firstHalf}${getMask(1)}${secondHalf}${getMask(2)}`,
    ),
    message: SSN_MESSAGE,
  });
  return encode(encryptedData);
};

/**
 * This function allows to decrypt data.
 * @param input
 * @returns {string|object}
 */
export const decryptData = (input) => {
  if (!input) {
    return '{}';
  }
  const parsedWordArray = Crypto.enc.Base64.parse(input);
  const {data} = JSON.parse(parsedWordArray.toString(Crypto.enc.Utf8));
  const salt = SSN_SECRET;
  const getRegExp = (char, reverse) => {
    const expression = `${salt}${char}`;
    return new RegExp(reverse ? reverseString(expression) : expression, 'g');
  };
  return decode(
    reverseString(data)
      .replace(getRegExp(maskChars[0]), '')
      .replace(getRegExp(maskChars[1]), '')
      .replace(getRegExp(maskChars[2], true), '')
      .replace(getRegExp(maskChars[2]), ''),
  );
};
