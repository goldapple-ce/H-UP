import { useState } from 'react';

export default function useInput() {
  const [state, setState] = useState('');

  function onChange(e) {
    if (e.target) {
      setState(e.target.value);
    }
  }

  function reset() {
    setState(() => '');
  }

  return { state, onChange, reset };
}
