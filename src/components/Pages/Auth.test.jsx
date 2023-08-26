import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Auth from './Pages/Auth';

describe("Auth Component", () => {
  it("renders without errors", () => {
    render(<Auth />);
  });

  it("toggles between login and signup modes", () => {
    render(<Auth />);
    
    const toggleButton = screen.getByText(/New User??/i);
    fireEvent.click(toggleButton);
    expect(screen.getByText(/SignUp/i)).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("displays error message on invalid form submission", async () => {
    render(<Auth />);
    
    const submitButton = screen.getByText(/login/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it("handles successful login", async () => {
    render(<Auth />);
    // Mock successful login response here

    const emailInput = screen.getByLabelText(/Email :/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });
  });

  it("handles failed login", async () => {
    render(<Auth />);
    // Mock failed login response here

    const emailInput = screen.getByLabelText(/Email :/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: "invalid@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("handles successful signup", async () => {
    render(<Auth />);
    // Mock successful signup response here

    // Simulate switching to signup mode
    const toggleButton = screen.getByText(/New User??/i);
    fireEvent.click(toggleButton);

    const emailInput = screen.getByLabelText(/Email :/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/signup/i);

    fireEvent.change(emailInput, { target: { value: "newuser@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "newpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Signup successful/i)).toBeInTheDocument();
    });
  });

  it("handles failed signup", async () => {
    render(<Auth />);
    // Mock failed signup response here

    // Simulate switching to signup mode
    const toggleButton = screen.getByText(/New User??/i);
    fireEvent.click(toggleButton);

    const emailInput = screen.getByLabelText(/Email :/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/signup/i);

    fireEvent.change(emailInput, { target: { value: "existing@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email already registered/i)).toBeInTheDocument();
    });
  });

  it("displays 'sending Req' button during request", async () => {
    render(<Auth />);
    // Mock a delayed response for login here

    const emailInput = screen.getByLabelText(/Email :/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/sending Req/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });
  });

  it("navigates to '/main' after successful login", async () => {
    render(<Auth />);
    // Mock successful login response here

    const emailInput = screen.getByLabelText(/Email :/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Add an assertion for navigation to '/main'
    });
  });

  it("toggles to 'Forgot Password' page on link click", () => {
    render(<Auth />);
    
    const forgotPasswordLink = screen.getByText(/Forgot Password/i);
    fireEvent.click(forgotPasswordLink);

    // Add an assertion for navigation to '/forgotPassword'
  });
});
