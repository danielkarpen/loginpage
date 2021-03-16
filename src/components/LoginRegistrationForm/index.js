import {
  Button,
  ButtonGroup,
  Collapse,
  Fade,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import api from 'api';
import { useReducer } from 'react';

function reducer(state, { type, payload }) {
  switch (type) {
    case 'activate-login-mode':
      return { ...state, ...{ mode: 'login', info: '' } };
    case 'activate-registration-mode':
      return { ...state, ...{ mode: 'registration', info: '' } };
    case 'activate-forgotten-mode':
      return { ...state, ...{ mode: 'forgotten', info: '' } };
    case 'update-info':
      return { ...state, ...{ info: payload } };
    default:
      throw new Error('Illegal action!');
  }
}

function LoginRegistrationForm() {
  const [formState, dispatch] = useReducer(reducer, { mode: 'login' });

  const handleClick = ({ target: { innerText } }) => {
    if (
      innerText === 'Already Have an Account?' ||
      innerText === 'Login/Register'
    ) {
      dispatch({ type: 'activate-login-mode' });
    } else {
      switch (innerText) {
        case 'No Account Yet?':
          dispatch({ type: 'activate-registration-mode' });
          break;

        case 'Forgot Password?':
          dispatch({ type: 'activate-forgotten-mode' });
          break;
        default:
          throw new Error('Illegal action!');
      }
    }
  };

  function renderSubmitTxt(mode) {
    switch (formState.mode) {
      case 'login':
        return 'Login';
      case 'registration':
        return 'Register';
      case 'forgotten':
        return 'Reset Password';
      default:
        throw new Error('Illegal form mode');
    }
  }

  const handleSubmit = async function (event) {
    event.preventDefault();
    const email = event.target.elements[0].value;
    const password = event.target.elements[1].value;

    switch (formState.mode) {
      case 'login':
        try {
          const user = await api.show(email, password);
          console.log(user);
        } catch (error) {
          dispatch({ type: 'update-info', payload: error.message });
        }
        break;
      case 'registration':
        try {
          const user = await api.create(email, password);
          console.log(user);
        } catch (error) {
          dispatch({ type: 'update-info', payload: error.message });
        }
        break;
      case 'forgotten':
        try {
          const msg = await api.update(email);
          dispatch({ type: 'update-info', payload: msg });
        } catch (error) {
          dispatch({ type: 'update-info', payload: error.message });
        }
        break;
      default:
        throw new Error('Illegal action!');
    }

    // await api.show(
    //   event.target.elements[0].value,
    //   event.target.elements[0].value
    // );
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>

      <Collapse in={!(formState.mode === 'forgotten')} animateOpacity>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
      </Collapse>

      <Collapse
        in={formState.mode === 'registration'}
        animateOpacity
        unmountOnExit
      >
        <FormControl id="name" isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl id="profile">
          <FormLabel>Upload a Profile Pic?</FormLabel>
          <Input
            type="file"
            accept="image/*"
            className="no-border no-left-padding"
          />
        </FormControl>
      </Collapse>

      <ButtonGroup variant="outline" spacing="6">
        <Button type="submit" colorScheme="green">
          {renderSubmitTxt(formState.mode)}
        </Button>

        <Fade in={!(formState.mode === 'forgotten')}>
          <Button type="button" colorScheme="blue" onClick={handleClick}>
            {formState.mode === 'login'
              ? 'No Account Yet?'
              : 'Already Have an Account?'}
          </Button>
        </Fade>

        <Button type="button" colorScheme="orange" onClick={handleClick}>
          {formState.mode === 'forgotten'
            ? 'Login/Register'
            : 'Forgot Password?'}
        </Button>
      </ButtonGroup>

      {formState.info ? <p className="text-red-300">{formState.info}</p> : null}
    </form>
  );
}

export default LoginRegistrationForm;
