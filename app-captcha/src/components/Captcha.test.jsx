import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import CaptchaComponent from "./Captcha";
import { NotificationProvider } from "../context/NotificationContext";

describe("CaptchaComponent", () => {
  beforeEach(() => {
    render(
      <NotificationProvider>
        <CaptchaComponent />
      </NotificationProvider>
    );
  });

  it("devrait afficher 'Chargement du captcha...' au début", () => {
    expect(screen.getByText(/Chargement du captcha.../i)).toBeInTheDocument();
  });

  it("devrait afficher l'image du captcha une fois le captcha récupéré", async () => {
    await waitFor(() => screen.getByAltText(/Captcha/i));
    expect(screen.getByAltText(/Captcha/i)).toBeInTheDocument();
  });

  it("devrait mettre à jour l'état de l'input lorsque l'utilisateur tape", async () => {
    const input = await screen.findByPlaceholderText(/Entrez le code captcha/i);
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });  
});
