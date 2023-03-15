/** @format */

function useDatePicker() {
  const typeOptions = [
    { id: 1, label: 'year', value: 'year' },
    { id: 2, label: 'month', value: 'month' },
    { id: 3, label: 'date', value: 'date' },
    { id: 4, label: 'datetime', value: 'datetime' },
    { id: 5, label: 'week', value: 'week' },
    { id: 6, label: 'datetimerange', value: 'datetimerange' },
    { id: 7, label: 'daterange', value: 'daterange' },
  ];

  return {
    datePickerOptions: typeOptions,
  };
}

export default useDatePicker;
