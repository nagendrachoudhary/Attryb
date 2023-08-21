import { createStyles, Header, Autocomplete, Group, Burger, rem, Input, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCar, IconCardboards, IconSearch } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));
export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
 const links  =[{label:"CARS",link:"car"}]
  const items = links.map((link) => (
    <Link
      key={link.label}
      to={'/'}
      className={classes.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={56} className={classes.header} pos={'sticky'} top={0} >
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" />
          <IconCardboards size={28} />
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          <Input
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size="1rem" stroke={1.5} />}
          />
          <Button>
            <Link to={'/Login'}>
                Login
            </Link>
          </Button>
        </Group>
      </div>
    </Header>
  );
}