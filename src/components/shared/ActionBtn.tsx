/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Spinner } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

const ActionSubmitButton = ({ children }: any) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant="faded">
      {pending ? <Spinner /> : children}
    </Button>
  );
};

export default ActionSubmitButton;
