import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    rem,
    Alert,
    Notification,
    Loader,
  } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { SingupApi } from './Api';
import { IconAlertCircle, IconX } from '@tabler/icons-react';
import { AuthContext } from '../AuthContext';
  
import { notifications } from '@mantine/notifications';
  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: '80vh',
      backgroundSize: 'cover',
      backgroundImage:
        'url(https://www.inventiva.co.in/wp-content/uploads/2021/08/How-to-earn-a-living-by-buying-and-selling-used-cars-780x470.jpg)',
    },
  
    form: {
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      minHeight: '80vh',
      maxWidth: rem(450),
      paddingTop: rem(80),
  
      [theme.fn.smallerThan('sm')]: {
        maxWidth: '100%',
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  }));
  
  export function Singup() {
    const [state, setstate] = useState({})
    const { classes } = useStyles();
    const [loader, setloader] = useState(false);
    const {login} = useContext(AuthContext)
    const Navigate=useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
    const handlechange =(e)=>{
      setstate({...state,[e.target.name]:e.target.value})
    }
    const senddata = (e)=>{
      setloader(true)
      SingupApi(state).then((res)=>{
        notifications.show({
          title: 'Singup Done',
          message: 'Hey , Pleace Login your accout created sussfuly🤥',
        })
        setloader(false)
        Navigate('/login')
      }).catch((err)=>{
        console.log(err)
        notifications.show({
          title: 'Opps!',
          message: `Try Again With diffrent Mail`,
        })
        setloader(false)
      })
        setTimeout(() => {
          setAlertVisible(false);
          setloader(false)
        }, 2000);   
    }
    return (
      <div className={classes.wrapper}>
        {/* <!-- Sign up --> */}
        {loader&&(
          <Loader pos={'absolute'} top={'50%'} left={'50%'} color="red" variant="bars" />
        )}
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to ATTRYB!
          </Title>
          <TextInput label="Name" name='name' onChange={(e)=>{handlechange(e)}} placeholder="Name" size="md" />
          <TextInput label="Email address" name='email' onChange={(e)=>{handlechange(e)}} type='email' placeholder="hello@gmail.com" size="md" />
          <PasswordInput label="Password" name='password' onChange={(e)=>{handlechange(e)}} placeholder="Your password" mt="md" size="md" />
          <Button color='green' onClick={()=>{senddata()}} fullWidth mt="xl" size="md">
            Singup
          </Button>
  
          <Text ta="center" mt="md">
           you have an account?{' '}
            <Link to={'/login'} weight={700}>
              Login
            </Link>
          </Text>
        </Paper>
      </div>
    );
  }