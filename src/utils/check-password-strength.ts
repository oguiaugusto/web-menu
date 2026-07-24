export function checkPasswordStrength(str: string) {
  const minLength = str.length >= 8;
  const hasLetter = /\p{L}/u.test(str);
  const hasNumber = /\d/.test(str);
  const hasUpperAndLower = /\p{Lu}/u.test(str) && /\p{Ll}/u.test(str);
  const hasSpecial = /[^\p{L}\d]/u.test(str);

  let score = 0;

  if (minLength) score++;
  if (hasLetter) score++;
  if (hasNumber) score++;

  const isValid = minLength && hasLetter && hasNumber;

  if (isValid && hasUpperAndLower) score++;
  if (isValid && hasSpecial) score++;

  return { isValid, score };
}
