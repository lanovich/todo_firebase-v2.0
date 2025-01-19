import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import styles from "./input-field.module.css";
import { useTodos } from "../../entities/Todos/useTodos";

interface InputFieldProps {
  placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ placeholder }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const { search, setSearch } = useTodos();

  const updateFilterParams =
    debounce((inputValue: string) => {
      setSearch(inputValue);
    }, 300);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    return () => {
      updateFilterParams.cancel();
    };
  }, [isFirstRender, updateFilterParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    console.log(search)
  };

  updateFilterParams(inputValue);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
};
