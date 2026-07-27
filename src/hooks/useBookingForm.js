import { useState, useCallback } from 'react';

/**
 * Single-Responsibility Custom Hook for Managing Booking Form State & Calculations
 */
export function useBookingForm(initialStep = 1) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState({
    serviceType: 'dry_cleaning',
    items: [],
    customerName: '',
    phone: '',
    address: '',
    date: '',
    timeSlot: '',
    notes: ''
  });

  const nextStep = useCallback(() => setCurrentStep(prev => prev + 1), []);
  const prevStep = useCallback(() => setCurrentStep(prev => Math.max(1, prev - 1)), []);

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const addItem = useCallback((item) => {
    setFormData(prev => ({ ...prev, items: [...prev.items, item] }));
  }, []);

  const removeItem = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  }, []);

  const computeSubtotal = useCallback(() => {
    return formData.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }, [formData.items]);

  const resetForm = useCallback(() => {
    setFormData({
      serviceType: 'dry_cleaning',
      items: [],
      customerName: '',
      phone: '',
      address: '',
      date: '',
      timeSlot: '',
      notes: ''
    });
    setCurrentStep(1);
  }, []);

  return {
    currentStep,
    formData,
    nextStep,
    prevStep,
    updateField,
    addItem,
    removeItem,
    computeSubtotal,
    resetForm
  };
}
