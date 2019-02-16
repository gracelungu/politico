/* eslint no-restricted-syntax: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-param-reassign: 0 */

function schema(args, obj) {
  // Checks if the property is defined
  for (const arg in args) {
    if (!obj[arg] === undefined) {
      return {
        passed: false,
        message: `The ${arg} attribute is required `,
      };
    }
  }

  for (const arg in args) {
    // When the type is an array
    if (args[arg] === 'array') {
      if (!(obj[arg] instanceof Array)) {
        return {
          passed: false,
          message: `The ${arg} should be an Array `,
        };
      }
    }

    // When the schema requires an integer
    if (args[arg] === 'integer') {
      if (!Number.isInteger(obj[arg])) {
        return {
          passed: false,
          message: `The ${arg} should be an integer `,
        };
      }
    }

    // When the type is a string
    if (args[arg] === 'string') {
      if (obj[arg]) {
        if (typeof obj[arg] === 'string') {
          obj[arg] = obj[arg].toString().replace(/\s+/g, ' ').trim();
        }
      }

      if (typeof obj[arg] !== 'string' || obj[arg] === '') {
        return {
          passed: false,
          message: `The ${arg} should be a valid string `,
        };
      }
    }

    // When the type is a number
    if (args[arg] === 'number') {
      if (typeof obj[arg] !== 'number') {
        return {
          passed: false,
          message: `The ${arg} should be a number `,
        };
      }
    }

    // When the type is a boolean
    if (args[arg] === 'boolean') {
      if (typeof obj[arg] !== 'boolean') {
        return {
          passed: false,
          message: `The ${arg} should be a boolean `,
        };
      }
    }

    // When the type is an email
    if (args[arg] === 'email') {
      if (!RegExp(/^[a-zA-Z0-9-._]+@[a-zA-Z-._]+.[a-zA-Z]{2,4}$/).test(obj[arg].toString().toLowerCase())) {
        return {
          passed: false,
          message: 'The email adress is invalid',
        };
      }
    }

    // When the type is an email
    if (args[arg] === 'password') {
      if (obj[arg]) {
        if (obj[arg].toString().length < 6) {
          return {
            passed: false,
            message: 'The password length is less than 6 characters',
          };
        }
      }
    }
  }

  return {
    passed: true,
    obj,
  };
}

module.exports = schema;
