// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserDirectory from './UserDirectory.jsx';

const USERS = [
  { id: 1, name: 'Ana Torres', email: 'ana@example.com' },
  { id: 2, name: 'Luis Perez', email: 'luis@example.com' },
  { id: 3, name: 'Sofia Ramirez', email: 'sofia@example.com' },
];
const ok = (data) => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(data) });
const fail = (status) => Promise.resolve({ ok: false, status, json: () => Promise.resolve({}) });

describe('R6 UserDirectory', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    delete globalThis.fetch;
  });

  it('calls GET /api/users once on mount and shows a loading state', async () => {
    fetch.mockReturnValue(ok(USERS));
    render(<UserDirectory />);
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading users...');
    await screen.findAllByTestId('user-item');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe('/api/users');
  });

  it('renders the users (name and email) and hides the loading message', async () => {
    fetch.mockReturnValue(ok(USERS));
    render(<UserDirectory />);
    const items = await screen.findAllByTestId('user-item');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('Ana Torres');
    expect(items[0]).toHaveTextContent('ana@example.com');
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('shows an error when the server answers with a non-2xx status', async () => {
    fetch.mockReturnValue(fail(500));
    render(<UserDirectory />);
    expect(await screen.findByTestId('error')).toHaveTextContent('Could not load users');
    expect(screen.queryAllByTestId('user-item')).toHaveLength(0);
  });

  it('shows an error when the network request itself fails', async () => {
    fetch.mockRejectedValue(new TypeError('Failed to fetch'));
    render(<UserDirectory />);
    expect(await screen.findByTestId('error')).toBeInTheDocument();
  });

  it('retry fetches again and shows the users when it works', async () => {
    const user = userEvent.setup();
    fetch.mockReturnValueOnce(fail(503)).mockReturnValueOnce(ok(USERS));
    render(<UserDirectory />);
    await user.click(await screen.findByTestId('retry-button'));
    expect(await screen.findAllByTestId('user-item')).toHaveLength(3);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  it('filters by name (case-insensitive) and shows a message when nothing matches', async () => {
    const user = userEvent.setup();
    fetch.mockReturnValue(ok(USERS));
    render(<UserDirectory />);
    await screen.findAllByTestId('user-item');
    await user.type(screen.getByTestId('user-search'), 'LUIS');
    const items = screen.getAllByTestId('user-item');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('Luis Perez');
    await user.clear(screen.getByTestId('user-search'));
    await user.type(screen.getByTestId('user-search'), 'zzz');
    expect(screen.getByTestId('no-users')).toHaveTextContent('No users match');
  });
});
