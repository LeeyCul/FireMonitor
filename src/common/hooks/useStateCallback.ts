//* * 模拟更新状态后执行回调 */
import { useState, useRef, useCallback, useEffect } from 'react';

export default function useStateCallback<T>(
  initialState: T | (() => T),
): [
  T,
  (value: React.SetStateAction<T>, callback?: (state: T) => void) => void,
] {
  const callbackRef = useRef<((state: T) => void) | null>();
  const [state, setState] = useState<T>(initialState);
  const setStateAfter = useCallback(
    (value: React.SetStateAction<T>, callback?: (state: T) => void) => {
      setState(value);
      callbackRef.current = callback;
    },
    [],
  );

  useEffect(() => {
    callbackRef.current && callbackRef.current(state);
    callbackRef.current = null;
  }, [state]);

  return [state, setStateAfter];
}
