// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupForm from './SignupForm.jsx';

const MSG = {
  name: 'Name is required',
  email: 'Enter a valid email',
  password: 'Password must be at least 8 characters and contain a number',
  confirm: 'Passwords do not match',
};
const input = (field) => screen.getByTestId(`${field}-input`);
const error = (field) => screen.queryByTestId(`${field}-error`);

async function fillValid(user) {
  await user.type(input('name'), '  Ada Lovelace ');
  await user.type(input('email'), 'ada@example.com');
  await user.type(input('password'), 'engine1843');
  await user.type(input('confirm'), 'engine1843');
}

describe('R3 SignupForm', () => {
  it('shows no errors on first render', () => {
    render(<SignupForm />);
    for (const field of Object.keys(MSG)) expect(error(field)).not.toBeInTheDocument();
  });

  it('shows an error only for the field that was touched (blurred)', async () => {
    const user = userEvent.setup();
    render(<SignupForm />);
    await user.click(input('name'));
    await user.tab(); // blur the name field
    expect(error('name')).toHaveTextContent(MSG.name);
    expect(error('email')).not.toBeInTheDocument();
  });

  it('shows every error after a failed submit and does not call onSubmit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    await user.click(screen.getByTestId('submit-button'));
    for (const [field, msg] of Object.entries(MSG)) {
      if (field === 'confirm') continue; // empty confirm === empty password, so it matches
      expect(error(field)).toHaveTextContent(msg);
    }
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('validates live once a field has been touched', async () => {
    const user = userEvent.setup();
    render(<SignupForm />);
    await user.type(input('email'), 'ada@');
    await user.tab();
    expect(error('email')).toHaveTextContent(MSG.email);
    await user.click(input('email'));
    await user.type(input('email'), 'example.com');
    expect(error('email')).not.toBeInTheDocument();
  });

  it('password needs 8+ characters AND a number', async () => {
    const user = userEvent.setup();
    render(<SignupForm />);
    await user.type(input('password'), 'abcdefgh');
    await user.tab();
    expect(error('password')).toHaveTextContent(MSG.password);
    await user.clear(input('password'));
    await user.type(input('password'), 'abc1');
    expect(error('password')).toHaveTextContent(MSG.password);
    await user.clear(input('password'));
    await user.type(input('password'), 'abcdefg1');
    expect(error('password')).not.toBeInTheDocument();
  });

  it('confirm must match the password', async () => {
    const user = userEvent.setup();
    render(<SignupForm />);
    await user.type(input('password'), 'engine1843');
    await user.type(input('confirm'), 'engine1842');
    await user.tab();
    expect(error('confirm')).toHaveTextContent(MSG.confirm);
  });

  it('submits trimmed data, shows a welcome message and resets the form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    await fillValid(user);
    await user.click(screen.getByTestId('submit-button'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'engine1843',
    });
    expect(screen.getByTestId('success-message')).toHaveTextContent('Welcome, Ada Lovelace!');
    for (const field of Object.keys(MSG)) {
      expect(input(field)).toHaveValue('');
      expect(error(field)).not.toBeInTheDocument(); // the reset form is "untouched" again
    }
  });
});
