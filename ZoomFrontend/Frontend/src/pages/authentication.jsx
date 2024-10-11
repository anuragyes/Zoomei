// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { AuthContext } from '../contexts/AuthContext';
// import { Snackbar } from '@mui/material';

// // Create default theme
// const defaultTheme = createTheme();

// export default function Authentication() {
//     const [username, setUsername] = React.useState('');
//     const [password, setPassword] = React.useState('');
//     const [name, setName] = React.useState('');
//     const [error, setError] = React.useState('');
//     const [message, setMessage] = React.useState('');
//     const [formState, setFormState] = React.useState(0);  // 0: Login, 1: Register
//     const [open, setOpen] = React.useState(false);

//     const { handleRegister, handleLogin } = React.useContext(AuthContext);
//     const handleAuth = async () => {
//         try {
//             if (formState === 0) {
//                 // Login case
//                 await handleLogin(username, password);
//             } else if (formState === 1) {
//                 // Register case
//                 const result = await handleRegister(name, username, password);
//                 setMessage(result);
//                 setOpen(true);
//                 resetForm();
//             }
//         } catch (err) {
//             // Log the full error for debugging
//             console.error('Error during authentication:', err);
    
//             // Check if the error response has a specific message
//             const errorMessage = err.response?.data?.message || "An error occurred during registration";
//             setError(errorMessage);  // Display a more specific error message
//         }
//     };

//     const resetForm = () => {
//         setUsername('');
//         setPassword('');
//         setName('');
//         setError('');
//         setFormState(0);
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Grid container component="main" sx={{ height: '100vh' }}>
//                 <CssBaseline />
//                 <Grid
//                     item
//                     xs={false}
//                     sm={4}
//                     md={7}
//                     sx={{
//                         backgroundImage: 'url(https://source.unsplash.com/random?nature)',  // Changed the image category to "nature"
//                         backgroundRepeat: 'no-repeat',
//                         backgroundColor: (t) =>
//                             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                     <Box
//                         sx={{
//                             my: 8,
//                             mx: 4,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                             <LockOutlinedIcon />
//                         </Avatar>

//                         <Typography component="h1" variant="h5">
//                             {formState === 0 ? 'Sign In' : 'Sign Up'}
//                         </Typography>

//                         <Box component="form" noValidate sx={{ mt: 1 }}>
//                             {formState === 1 && (
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="name"
//                                     label="Full Name"
//                                     name="name"
//                                     value={name}
//                                     autoFocus
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                             )}

//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="username"
//                                 label="Username"
//                                 name="username"
//                                 value={username}
//                                 autoFocus
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />

//                             {error && <Typography color="error">{error}</Typography>}

//                             <Button
//                                 type="button"
//                                 fullWidth
//                                 variant="contained"
//                                 sx={{ mt: 3, mb: 2 }}
//                                 onClick={handleAuth}
//                             >
//                                 {formState === 0 ? 'Login' : 'Register'}
//                             </Button>

//                             <Button
//                                 onClick={() => setFormState((prevState) => (prevState === 0 ? 1 : 0))}
//                                 fullWidth
//                                 sx={{ mb: 2 }}
//                             >
//                                 {formState === 0 ? 'Switch to Sign Up' : 'Switch to Sign In'}
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Grid>
//             </Grid>

//             <Snackbar
//                 open={open}
//                 autoHideDuration={4000}
//                 message={message}
//             />
//         </ThemeProvider>
//     );
// }


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

// Create default theme
const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0); // 0: Login, 1: Register
    const [open, setOpen] = React.useState(false);
    
    const { handleRegister, handleLogin } = React.useContext(AuthContext);


    const handleAuth = async () => {
        setError(''); // Reset error state before authentication
        try {
            if (formState === 0) {
                // Handle login
                await handleLogin(username, password);
            } else {
                // Handle registration
                const result = await handleRegister(name, username, password);
                setMessage(result);  // Set registration success message
                setOpen(true);       // Trigger modal or confirmation popup
                resetForm();         // Clear form inputs after successful registration
            }
        } catch (err) {
            // Handle specific response errors or default to a generic message
            if (err.response) {
                setError(err.response.data?.message || "An error occurred. Please try again.");
            } else if (err.request) {
                setError("No response from server. Please try again later.");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };
    

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setName('');
        setError('');
        setFormState(0);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <div>
                            <Button variant={formState === 0 ? "contained" : "outlined"} onClick={() => setFormState(0)}>
                                Sign In
                            </Button>
                            <Button variant={formState === 1 ? "contained" : "outlined"} onClick={() => setFormState(1)}>
                                Sign Up
                            </Button>
                        </div>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <Typography color="error">{error}</Typography>}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </ThemeProvider>
    );
}
