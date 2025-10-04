import React from "react";
import { describe, it, expect } from "vitest";
import { passwordStrength, validateEmail } from "../../src/utils/validation";


describe('passwordStrength', () => {
    it('Should return the strength of the password in text', () => {
      expect(passwordStrength('password')).toBe('Weak');
      expect(passwordStrength('Password')).toBe('Medium');
      expect(passwordStrength('P@ssword123')).toBe('Strong');
  })
})


describe('validateEmail', () => { 
  it('Should return true if properly formatted email.', () => { 
    expect(validateEmail('abc')).toBe(false);
    expect(validateEmail('abc@')).toBe(false);
    expect(validateEmail('abc@test')).toBe(false);
    expect(validateEmail('abc@test.com')).toBe(true);
  })
})

