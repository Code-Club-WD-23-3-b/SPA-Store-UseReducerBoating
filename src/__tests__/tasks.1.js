import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

//Test cases will only execute depending on the state of the Engine (see App.js)
describe('Start Engine', () => {
   it("'Start engine' button exists", () => {
        render(<App />);
        const startButton = screen.getByRole('button', { name: /start/i });
        expect(startButton).toBeEnabled();
    }) 
    it("Starts engine when clicked", () => {
      render(<App />);
      const startButton = screen.getByRole('button', { name: /start/i });
      const engineText = screen.getByText(/engine.*?off/i);
      fireEvent.click(startButton);
      expect(engineText).toHaveTextContent(/engine.*?on/i);
  }) 
}) 
describe('Gear Up', () => {
  it("'Gear up' button exists", () => {
    render(<App />);
    const gearUpButton = screen.getByRole('button', { name: /gear.*?up/i });
    expect(gearUpButton).toBeEnabled();
  })
  it("Increments the gear by 1 when clicked", () => {
    render(<App />);
    const gearUpButton = screen.getByRole('button', { name: /gear.*?up/i });
    const currentGearText = screen.getByText(/current.*?gear/i);
    const engineText = screen.getByText(/engine.*?off/i);
    if(/engine.*?on/i.test(engineText.textContent) && /\b0\b/.test(curentGearText.textContent)) {
      fireEvent.click(gearUpButton);
      expect(currentGearText).toHaveTextContent(/current.*?gear.*?1/i);
    }
  })
})
describe('Gear Down', () => {
  it(" 'Gear Down' button exists", () => {
    render(<App />);
    const gearDownButton = screen.getByRole('button', { name: /gear.*?down/i });
    expect(gearDownButton).toBeEnabled();
  })
  it("Decrements the gear by 1 when clicked", () => {
      render(<App />);
      const gearDownButton = screen.getByRole('button', { name: /gear.*?down/i });
      const currentGearText = screen.getByText(/current.*?gear/i);
      const engineText = screen.getByText(/engine.*?off/i);
      if(engineText.textContent === 'engine on' && currentGearText >= 1) {
        fireEvent.click(gearDownButton);
        expect(currentGearText).toHaveTextContent(/current.*?gear.*?-1/i);
      }
    })
})
describe('Accelerate', () => {
  it("'Accelerate' button exists", () => {
    render(<App />);
    const accelerateButton = screen.getByRole('button', { name: /accelerate/i });
    expect(accelerateButton).toBeEnabled();
  })
  it("'Increments the speed by 10 when clicked", () => {
    render(<App />);
    const accelerateButton = screen.getByRole('button', { name: /accelerate/i });
    const speedText = screen.getByText(/speed/i);
    const engineText = screen.getByText(/engine.*?off/i);
    const currentGearText = screen.getByText(/current.*?gear/i);
    if(engineText.textContent === 'engine on' && currentGearText >= 1) {
        fireEvent.click(accelerateButton);
        expect(speedText).toHaveTextContent(/speed.*?10/i);
    }
  })
})