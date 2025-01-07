import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { VisuallyHiddenInput } from '../components/styles/StyledComponent';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { usernameValidator } from '../utils/validators';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin(!isLogin);
  const name = useInputValidation('');
  const bio = useInputValidation('');
  const password = useInputValidation();
  const username = useInputValidation('', usernameValidator);

  const avatar = useFileHandler('single');

  const handelLogin = (e) => {
    e.preventDefault();
  };
  const handelSignup = (e) => {
    e.preventDefault();
  };

  return (
    <Container
      component={'main'}
      maxWidth='xs'
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLogin ? (
          <>
            <Typography variant='h5'>Login</Typography>
            <form style={{ width: '100%', marginTop: '1rem' }}>
              <TextField
                required
                fullWidth
                label='Username'
                margin='normal'
                variant='outlined'
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <Typography color='error' variant='caption'>
                  {username.error}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label='Password'
                margin='normal'
                type='password'
                variant='outlined'
                value={password.value}
                onChange={password.changeHandler}
              />

              <Button
                sx={{ marginTop: '1rem' }}
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
                onSubmit={handelLogin}
              >
                Login
              </Button>
              <Typography sx={{ marginTop: '1rem', textAlign: 'center' }}>
                OR
              </Typography>
              <Button
                sx={{ marginTop: '1rem' }}
                fullWidth
                onClick={toggleLogin}
              >
                Register An Account
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant='h5'>Signup</Typography>
            <form style={{ width: '100%', marginTop: '1rem' }}>
              <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                <Avatar
                  sx={{ width: '10rem', height: '10rem', objectFit: 'contain' }}
                  src={avatar.preview}
                />

                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.5)', // Fixed the closing parenthesis
                    ':hover': {
                      bgcolor: 'rgba(0,0,0,0.7)',
                    },
                  }}
                  component='label'
                >
                  <CameraAltIcon />
                  <VisuallyHiddenInput
                    type='file'
                    onChange={avatar.changeHandler}
                  />
                </IconButton>
              </Stack>
              {avatar.error && (
                <Typography color='error' variant='caption'>
                  {avatar.error}
                </Typography>
              )}

              <TextField
                required
                fullWidth
                label='Name'
                margin='normal'
                variant='outlined'
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                required
                fullWidth
                label='Username'
                margin='normal'
                variant='outlined'
                value={username.value}
                onChange={username.changeHandler}
              />
              <TextField
                required
                fullWidth
                label='Bio'
                margin='normal'
                variant='outlined'
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <TextField
                required
                fullWidth
                label='Password'
                margin='normal'
                type='password'
                variant='outlined'
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                sx={{ marginTop: '1rem' }}
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
                onSubmit={handelSignup}
              >
                Register
              </Button>
              <Typography sx={{ textAlign: 'center', marginTop: '1rem' }}>
                OR
              </Typography>
              <Button onClick={toggleLogin} fullWidth>
                Go back to login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
