/**
 * 生成符合规则的4位数字密码
 * 规则：
 * 1. 排除全重复数字（如 0000、1111）
 * 2. 排除顺序或倒序数字（如 1234、4321）
 * 3. 排除包含数字 4 的组合（文化忌讳）
 */

// 可用数字（排除4）
const VALID_DIGITS = ['0', '1', '2', '3', '5', '6', '7', '8', '9'];

// 检查是否为全重复数字
function isAllSameDigits(password: string): boolean {
  return password.split('').every(d => d === password[0]);
}

// 检查是否为顺序或倒序数字
function isSequential(password: string): boolean {
  const digits = password.split('').map(Number);
  
  // 检查顺序（如 1235, 5678）
  let isAscending = true;
  let isDescending = true;
  
  for (let i = 1; i < digits.length; i++) {
    if (digits[i] !== digits[i - 1] + 1) {
      isAscending = false;
    }
    if (digits[i] !== digits[i - 1] - 1) {
      isDescending = false;
    }
  }
  
  return isAscending || isDescending;
}

// 检查是否包含数字4
function containsFour(password: string): boolean {
  return password.includes('4');
}

// 验证密码是否符合所有规则
function isValidPassword(password: string): boolean {
  if (containsFour(password)) return false;
  if (isAllSameDigits(password)) return false;
  if (isSequential(password)) return false;
  return true;
}

// 生成随机4位密码
export function generatePassword(): string {
  let password = '';
  let attempts = 0;
  const maxAttempts = 100;
  
  while (attempts < maxAttempts) {
    password = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * VALID_DIGITS.length);
      password += VALID_DIGITS[randomIndex];
    }
    
    if (isValidPassword(password)) {
      return password;
    }
    attempts++;
  }
  
  // 备用密码（符合所有规则）
  return '5928';
}
