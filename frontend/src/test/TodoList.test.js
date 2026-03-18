import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';
import '@testing-library/jest-dom'; 

test('renders TodoList header', () => {
  render(<TodoList tasks={[]} />);
  expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
});