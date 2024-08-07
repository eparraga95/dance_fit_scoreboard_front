import { FunctionComponent } from "react";
import { UseFormRegister } from "react-hook-form";
import { SelectContainer, StyledSelect } from "./styles";
import { ErrorMessage, Label } from "../Input/styles";

interface SelectProps {
  label?: string;
  options: { label: string; value: string | number }[];
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  error: string | undefined;
  [key: string]: any;
}

const Select: FunctionComponent<SelectProps> = ({
  label,
  options,
  register,
  placeholder,
  name,
  error = "",
  ...rest
}) => {
  return (
    <SelectContainer>
      {label && <Label>{label}</Label>}
      <div>
        <StyledSelect {...rest} {...register(name)} >
          {placeholder && (
            <option value="" defaultValue={"Selecionar"}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </div>
      <ErrorMessage>{error}</ErrorMessage>
    </SelectContainer>
  );
};

export default Select;
