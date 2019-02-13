/* eslint no-restricted-syntax: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-param-reassign: 0 */

function schema(args, obj) {
  // Checks if the property is defined
  for (const arg in args) {
    if (!obj[arg]) {
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
      if (typeof obj[arg] !== 'string') {
        return {
          passed: false,
          message: `The ${arg} should be a string `,
        };
      }
      obj[arg] = obj[arg].replace(/\s+/g, ' ').trim();
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
  }

  return {
    passed: true,
    obj,
  };
}

module.exports = schema;
