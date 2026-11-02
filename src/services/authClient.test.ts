import test from 'node:test';
import assert from 'node:assert/strict';
import { authClient, getCurrentSessionUser } from './authClient';

test('authClient signUp, signIn, updateUser (Challenge C3), and signOut work end-to-end', async () => {
  await authClient.signOut();
  assert.equal(getCurrentSessionUser(), null);

  // Register a new user
  const signUpRes = await authClient.signUp.email({
    name: 'রহিম উদ্দিন',
    email: 'rahim@example.com',
    password: 'password123',
  });
  assert.equal(signUpRes.error, null);
  assert.equal(signUpRes.data?.name, 'রহিম উদ্দিন');

  // Sign in with the new user
  const signInRes = await authClient.signIn.email({
    email: 'rahim@example.com',
    password: 'password123',
  });
  assert.equal(signInRes.error, null);
  assert.equal(getCurrentSessionUser()?.email, 'rahim@example.com');

  // Update user name (Challenge C3)
  const updateRes = await authClient.updateUser({
    name: 'রহিম উদ্দিন আহমেদ',
  });
  assert.equal(updateRes.error, null);
  assert.equal(updateRes.data?.name, 'রহিম উদ্দিন আহমেদ');
  assert.equal(getCurrentSessionUser()?.name, 'রহিম উদ্দিন আহমেদ');

  // Sign out
  await authClient.signOut();
  assert.equal(getCurrentSessionUser(), null);
});
