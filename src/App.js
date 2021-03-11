import { ChakraProvider, Container, Grid, theme } from '@chakra-ui/react';
import { Form } from 'components';
import { BaseCard } from 'components/base';
import React from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './index.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Container>
          <BaseCard>
            <Form />
          </BaseCard>
        </Container>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
