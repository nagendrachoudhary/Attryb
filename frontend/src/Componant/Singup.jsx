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
  } from '@mantine/core';
import { Link } from 'react-router-dom';
  
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
    const { classes } = useStyles();
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to ATTRYB!
          </Title>
          <TextInput label="Name" placeholder="Name" size="md" />
          <TextInput label="Email address" type='email' placeholder="hello@gmail.com" size="md" />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button color='green' fullWidth mt="xl" size="md">
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