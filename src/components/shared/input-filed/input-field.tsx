import React, { useState, useEffect, useCallback } from 'react';
import { useTodoListFilterStore } from '../../../store';
import debounce from 'lodash.debounce';
import styles from './input-filed.module.css';

interface InputFieldProps {
  placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ placeholder }) => {
  const { filterParams, setFilterParams } = useTodoListFilterStore();
  const [localFilter, setLocalFilter] = useState(filterParams);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const updateFilterParams = useCallback(
    debounce((value: string) => {
      setFilterParams(value);
    }, 300),
    [setFilterParams]
  );

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    updateFilterParams(localFilter);

    return () => {
      updateFilterParams.cancel();
    };
  }, [localFilter, updateFilterParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilter(e.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={localFilter}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
};
