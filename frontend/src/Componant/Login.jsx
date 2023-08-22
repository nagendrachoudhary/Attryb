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
  Box,
  Loader,
} from "@mantine/core";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginApi} from "./Api";
import { AuthContext } from "../AuthContext";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "80%",
    maxHeight: "80%",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://www.inventiva.co.in/wp-content/uploads/2021/08/How-to-earn-a-living-by-buying-and-selling-used-cars-780x470.jpg)",
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '80vh',
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function Login() {
  const { classes } = useStyles();
  const [state,setstate] = useState({});
  const [loader, setloader] = useState(false);
  const {login}=useContext(AuthContext)
  const handlechange =(e)=>{
         setstate({...state,[e.target.name]:e.target.value})
  }
  const senddata =()=>{
    setloader(true)
    if(state?.email&&state?.password){
      setTimeout(() => {
        
        login(state)
      }, 5000);
  }
  setTimeout(() => {
    setloader(false)
    }, 5000);
  }
  return (

    <Box mah={'80vh'} >
      <Box className={classes.wrapper}>
      {loader&&(<Loader pos={'absolute'} top={'50%'} left={'50%'} color="red" variant="bars" />)}
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}>
            Welcome back to ATTRYB!
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            name="email"
            onChange={(e)=>{handlechange(e)}}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            name="password"
            onChange={(e)=>{handlechange(e)}}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button onClick={()=>{senddata()}} color='red' fullWidth mt="xl" size="md">
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Link to={"/Register"} weight={700}>
              Register
            </Link>
          </Text>
        </Paper>
      </Box>
    </Box>
  );
}
