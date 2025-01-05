import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
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
              />
              <TextField
                required
                fullWidth
                label='Password'
                margin='normal'
                type='password'
                variant='outlined'
              />
              <Button
                sx={{ marginTop: '1rem' }}
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
              >
                Login
              </Button>
              <Typography sx={{ marginTop: '1rem', textAlign: 'center' }}>
                OR
              </Typography>
              <Button
                sx={{ marginTop: '1rem' }}
                fullWidth
                onClick={() => setIsLogin(false)}
              >
                Register An Account
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant='h5'>Signup</Typography>
            <form style={{ width: '100%', marginTop: '1rem' }}>
              <TextField
                required
                fullWidth
                label='Name'
                margin='normal'
                variant='outlined'
              />
              <TextField
                required
                fullWidth
                label='Username'
                margin='normal'
                variant='outlined'
              />
              <TextField
                required
                fullWidth
                label='Password'
                margin='normal'
                type='password'
                variant='outlined'
              />
              <Button
                sx={{ marginTop: '1rem' }}
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
              >
                Register
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
