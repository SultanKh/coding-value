export function isNumber(input) {
    const numberRegex = /^\d+$/;
    return numberRegex.test(input);
  }


  export function validateName(name) {
    // Define a regular expression pattern to match strings of up to 30 characters
    const namePattern = /^[a-zA-Z\s]{1,30}$/;
    return namePattern.test(name);
  }