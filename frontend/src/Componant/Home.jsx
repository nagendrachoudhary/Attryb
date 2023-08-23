import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  rem,
  Box,
  Card,
  Image,
  Badge,
  Center,
  ColorSwatch,
  useMantineTheme,
  LoadingOverlay,
  Select,
  RangeSlider,
  HoverCard,
  Modal,
  Input,
} from "@mantine/core";
import { GetCar, deletecar, updatecar } from "./Api";
import { TimeAgo } from "./TimeAgo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import AddCars from "./AddCars";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));
export function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [State, setState] = useState([]);
  const [Mount, setMount] = useState(true);
  const [CarData, setCarData] = useState({});
  const [params, setparams] = useState({
    price: "All",
    mileage: {low:0,high:100},
    color: "All",
  });
  const [loader, setloader] = useState(true);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  useEffect(() => {
    setloader(true);
    let timeoutId;
    function debounceAction() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        GetCar(params)
          .then((res) => {
            setState(res.data);
            setloader(false);
          })
          .catch((err) => {
            console.log("Error", err);
            setloader(false);
          });
      }, 2000);
    }
    clearTimeout(timeoutId);
    debounceAction();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [setState, params,Mount]);
  const handlechange = (e) => {
    setCarData({ ...CarData, [e.target.name]: e.target.value });
  };
  return (
    <Box>
      <LoadingOverlay
        loaderProps={{ size: "sm", color: "pink", variant: "bars" }}
        overlayOpacity={0.3}
        overlayColor="#c5c5c5"
        visible={loader}
      />
      <Box display={"flex"}>
        {/* Price, Colors, and Mileage. */}
        <Select
          w={"250px"}
          onChange={(e) => {
            setparams({ ...params, price: e });
          }}
          label="Price"
          placeholder="Price"
          data={[
            { value: "All", label: "ALL" },
            { value: "hightolow", label: "Price High to Low" },
            { value: "lowtohigh", label: "Price Low to High" },
          ]}
        />
        {/* <Select w={'250px'}  onChange={(e)=>{setparams({...params,mileage:e})}} label="Mileage" placeholder="Mileage" data={[{ value: 'All', label: 'ALL' },{ value: 'hightolow', label: 'Mileage High to Low' },{ value: 'lowtohigh', label: 'Mileage Low to High' }]} /> */}
        <HoverCard width={"350px"} shadow="md">
          <HoverCard.Target>
            <Button mt={"auto"} color="indigo">
              Mileage
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <RangeSlider
              defaultValue={[params.mileage.low, params.mileage.high]}
              placeholder="Mileage"
              thumbSize={14}
              onChange={(e) => {
                let timeoutId;
                function debounceAction() {
                  clearTimeout(timeoutId);
                  timeoutId = setTimeout(() => {
                    setparams({
                      ...params,
                      mileage: { low: Number(e[0]), high: Number(e[1]) },
                    });
                  }, 2000);
                }
                clearTimeout(timeoutId);
                debounceAction();
              }}
              mt="xl"
              w={"300px"}
              color="red"
            />
          </HoverCard.Dropdown>
        </HoverCard>
        <Select
          w={"250px"}
          onChange={(e) => {
            setparams({ ...params, color: e });
          }}
          label="Color"
          placeholder="Color"
          data={[
            { value: "All", label: "ALL" },
            "Red",
            "Green",
            "Blue",
            "Yellow",
            "Purple",
            "Black",
          ]}
        />
      </Box>
      <Box
        display={"flex"}
        style={{
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
          margin: "auto",
          alignItems: "start",
        }}>
        {State.length > 0 ? (
          State.map((el, i) => {
            return (
              
              <Card w={"400px"} withBorder radius="md" className={classes.card}>
                <Card.Section className={classes.imageSection}>
                  <Image src={el.image} alt="Tesla Model S" />
                </Card.Section>

                <Group position="apart" mt="md">
                  <div>
                    <Text fw={500}>{el.name}</Text>
                    <Text fz="xs" c="dimmed"></Text>
                  </div>
                  <Badge variant="outline">25% off</Badge>
                </Group>

                <Card.Section className={classes.section} mt="md">
                  <Text fz="sm" c="dimmed" className={classes.label}>
                    Basic configuration
                  </Text>

                  <Group spacing={8} mb={-8}>
                    <Box
                      display={"flex"}
                      style={{ justifyContent: "space-between" }}
                      w={"100%"}
                      key="Color">
                      <Text size="xs">COLOR</Text>
                      <ColorSwatch key={el.color} color={el.color} />
                    </Box>
                    <Box
                      display={"flex"}
                      style={{ justifyContent: "space-between" }}
                      w={"100%"}
                      key="Color">
                      <Text size="xs">mileage</Text>
                      <Text size="xs">{el.mileage}</Text>
                    </Box>
                  </Group>
                </Card.Section>

                <Card.Section className={classes.section}>
                  <Group spacing={30}>
                    <div>
                      <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                        Price:- ${el.price}
                      </Text>
                      <Box
                        display={"flex"}
                        fz="sm"
                        c="dimmed"
                        fw={500}
                        s
                        mt={10}>
                        <p>Posted:-</p> <TimeAgo timestamp={el.updatedAt} />
                      </Box>
                    </div>
                  </Group>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <Button
                      color="red"
                      radius="xl"
                      onClick={(e) => {
                        setloader(true);
                        deletecar(el._id)
                          .then(() => {
                            State.splice(i, 1);
                            setState([...State]);
                            setloader(false);
                            notifications.show({
                              title: "Car Deleted",
                              style: { color: "red" },
                            });
                          })
                          .catch((err) => {
                            notifications.show({
                              title: "Login First",
                              style: { color: "red", background: "red" },
                            });
                            setloader(false);
                            console.log(err);
                          });
                      }}
                      style={{ flex: 1 }}>
                      DELETE
                    </Button>
                    <Button
                      color="dark"
                      radius="xl"
                      style={{ flex: 1 }}
                      onClick={()=>{open()
                      
                      }}>
                      UPDATE
                    </Button>
                    <Modal opened={opened} onClose={close} title="Update">
                      <Input.Wrapper>
                        <Input.Wrapper
                          id="Title"
                          label="Car Name"
                          required
                          maw={320}
                          mx="auto">
                          <Input
                            name="name"
                            defaultValue={el.name}
                            onChange={(e) => {
                              handlechange(e)
                            }}
                            mask="Honda City"
                            id="Title"
                            placeholder="Honda City"
                          />
                          <Input.Wrapper
                            id="Price"
                            label="Car Price"
                            required
                            maw={320}
                            mx="auto">
                            <Input
                              name="price"
                              defaultValue={el.price}
                              onChange={(e) => {
                                handlechange(e)
                              }}
                              mask="15000"
                              type="number"
                              id="Price"
                              placeholder="100000"
                            />
                          </Input.Wrapper>
                          <Input.Wrapper
                            id="Mileage"
                            label="Car Mileage"
                            required
                            maw={320}
                            mx="auto">
                            <Input
                              name="mileage"
                              defaultValue={el.mileage}
                              onChange={(e) => {
                                handlechange(e)
                              }}
                              mask="15"
                              type="number"
                              id="Mileage"
                              placeholder="15"
                            />
                          </Input.Wrapper>
                          <Input.Wrapper
                            id="color"
                            label="color"
                            required
                            maw={320}
                            mx="auto">
                            <Input
                              label="color"
                              required
                              defaultValue={el.color}
                              name="color"
                              onChange={(e) => {
                                handlechange(e)
                              }}
                              mask="Red"
                              id="color"
                              placeholder="Red"
                            />
                          </Input.Wrapper>
                          <Input.Wrapper
                            id="description"
                            label="description"
                            required
                            maw={320}
                            mx="auto"></Input.Wrapper>{" "}
                          <textarea
                            defaultValue={el.description}
                            style={{
                              maxWidth: "100%",
                              width: "100%",
                              height: "100px",
                            }}
                            name="description"
                            onChange={(e) => {
                              handlechange(e)
                            }}
                            placeholder="description"
                          />
                          <Button
                            w={"100%"}
                            onClick={(e) => {
                              setloader(true)
                              updatecar(el._id,CarData).then((res)=>{
                                setloader(false)
                                setMount(!Mount)
                                notifications.show({
                                  type:"error",
                                  message:`Successfully Updated`
                                })
                                close()
                              }).catch(()=>{
                                setloader(false)
                                close()
                                notifications.show({
                                  title: "Login First",
                                  style: { color: "red", background: "red" },
                                });
                              })
                            }}
                            type="submit"
                            color="red">
                            Update
                          </Button>
                        </Input.Wrapper>
                      </Input.Wrapper>
                    </Modal>
                  </Box>
                </Card.Section>
              </Card>
            );
          })
        ) : (
          <h1>No Data</h1>
        )}{" "}
      </Box>
    </Box>
  );
}
