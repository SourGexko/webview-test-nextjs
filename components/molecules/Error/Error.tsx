import { Center } from "../../atoms/Center/Center";

interface ErrorProps {
  children: React.ReactNode;
  retry?: () => void;
}

export const Error = ({ children, retry }: ErrorProps) => {
  return <Center>{children}</Center>;
};
