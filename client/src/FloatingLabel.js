import React, { useEffect } from 'react';

const FloatingLabel = ({ formSelector }) => {
  useEffect(() => {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const options = {
      focusClass: 'focus',
      activeClass: 'active',
      errorClass: 'error',
    };

    form.classList.add('has-floated-label');

    const labels = form.querySelectorAll('label');
    labels.forEach((label) => {
      const inputId = label.getAttribute('for');
      if (!inputId) return;

      const input = document.querySelector(`#${inputId}`);
      if (!input) return;

      const eventHandler = () => {
        input.parentNode.classList.remove(options.errorClass);
        input.parentNode.classList.toggle(options.activeClass, !!input.value);
      };

      ['keyup', 'input', 'change'].forEach((event) => {
        input.addEventListener(event, eventHandler);
      });

      input.addEventListener('focus', () => {
        input.parentNode.classList.add(options.focusClass);
      });

      input.addEventListener('blur', () => {
        input.parentNode.classList.remove(options.focusClass);
      });

      input.parentNode.classList.toggle(options.activeClass, !!input.value);
    });
  }, [formSelector]);

  return null; // Render nothing as it's just a utility component
};

export default FloatingLabel;
