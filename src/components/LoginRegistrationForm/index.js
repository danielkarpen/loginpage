import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

function LoginRegistrationForm() {
  return (
    <form className="flex flex-col gap-3">
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>

      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>

      <ButtonGroup variant="outline" spacing="6">
        <Button colorScheme="blue">Login</Button>
        <Button colorScheme="green">Register</Button>
        <Button colorScheme="orange">Forgot Password</Button>
      </ButtonGroup>
    </form>
  );
}

export default LoginRegistrationForm;
