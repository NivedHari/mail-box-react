import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Import configureStore from redux-mock-store
import EmailBody from './EmailBody';

describe('EmailBody Component', () => {
  const mockMail = {
    id: '1',
    subject: 'Test Subject',
    sender: 'test@example.com',
    timestamp: '2024-02-05T12:00:00',
    message: 'Test message content.',
  };

  test('Renders Sender', () => {
    // Create a mock Redux store using redux-mock-store
    const mockStore = configureStore([]);

    // Dispatch the initial state to the store
    const store = mockStore({
      email: {
        inbox: [mockMail],
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <EmailBody />
        </Router>
      </Provider>
    );

    // Assert that the sender is rendered correctly
    const sender = screen.getByText('From: test@example.com');
    expect(sender).toBeInTheDocument();
  });
});
