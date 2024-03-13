export function generatePassword(): string {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialCharacters = '!@#$%^&*()-_=+';

  let password = '';

  // Generate at least 2 uppercase letters
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * uppercaseLetters.length);
    password += uppercaseLetters.charAt(randomIndex);
  }

  // Generate at least 3 lowercase letters
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
    password += lowercaseLetters.charAt(randomIndex);
  }

  // Generate at least 3 digits
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    password += numbers.charAt(randomIndex);
  }

  // Generate at least 2 special characters
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * specialCharacters.length);
    password += specialCharacters.charAt(randomIndex);
  }

  // Shuffle the password string
  password = shuffleString(password);

  return password;
}

function shuffleString(s: string): string {
  const array = s.split('');

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.join('');
}
