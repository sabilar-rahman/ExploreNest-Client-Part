import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TCInputProps = {
  type: string;
  name: string;
  label?: string;
  initialValue?: string | number;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
};

const ReuseableInput = ({
  type,
  name,
  label,
  initialValue,
  disabled,
  placeholder,
  required,
}: TCInputProps) => {
  return (
    <div style={{ marginBottom: "0px" }}>
      <Controller
        defaultValue={initialValue}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item initialValue={10000} label={label}>
            <Input
              placeholder={placeholder}
              size="large"
              {...field}
              disabled={disabled}
              id={name}
              required={required}
              type={type}
            />
            <div>
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </div>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default ReuseableInput;