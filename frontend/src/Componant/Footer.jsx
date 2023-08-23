import { createStyles, Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconCar } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: rem(200),

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: rem(5),

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}));


export function FooterLinks() {
    const { classes } = useStyles();
  
    // Sample link data (customize as needed)
    const linksSection1 = [
      { text: 'Link 1', url: '/link1' },
      { text: 'Link 2', url: '/link2' },
      { text: 'Link 3', url: '/link3' },
      // Add more links
    ];
  
    const linksSection2 = [
      { text: 'Link 4', url: '/link4' },
      { text: 'Link 5', url: '/link5' },
      { text: 'Link 6', url: '/link6' },
      // Add more links
    ];
  
    const linksSection3 = [
      { text: 'Link 7', url: '/link7' },
      { text: 'Link 8', url: '/link8' },
      { text: 'Link 9', url: '/link9' },
      // Add more links
    ];
  
    return (
      <footer className={classes.footer}>
        <Container className={classes.inner}>
          <div className={classes.logo}>
            <IconCar size={30} />
            <Text size="xs" color="dimmed" className={classes.description}>
              Build fully functional accessible web applications faster than ever
            </Text>
          </div>
          <div className={classes.groups}></div>
        </Container>
        <Container className={classes.afterFooter}>
          <Text color="dimmed" size="sm">
            © 2023. All rights reserved.
          </Text>
  
          {/* Add links section 1 */}
          <div className={classes.linkSection}>
            <h4>Section 1</h4>
            <ul>
              {linksSection1.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className={classes.link}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Add links section 2 */}
          <div className={classes.linkSection}>
            <h4>Section 2</h4>
            <ul>
              {linksSection2.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className={classes.link}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Add links section 3 */}
          <div className={classes.linkSection}>
            <h4>Section 3</h4>
            <ul>
              {linksSection3.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className={classes.link}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
  
          <Group spacing={0} className={classes.social} position="right" noWrap>
            <ActionIcon size="lg">
              <IconBrandTwitter size="1.05rem" stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg">
              <IconBrandYoutube size="1.05rem" stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg">
              <IconBrandInstagram size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </Group>
        </Container>
      </footer>
    );
  }