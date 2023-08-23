import {
  Box,
  Button,
  ColorInput,
  ColorPicker,
  FileInput,
  Input,
  LoadingOverlay,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import { notifications } from "@mantine/notifications";
import { Addcar } from "./Api";
import axios from "axios";
export default function AddCars() {
  const [loader, setloader] = useState(false);
  const [CarData, setCarData] = useState({});
  const [Filedata, setFiledata] = useState('');
  
  const handlechange = (e) => {
    setCarData({ ...CarData, [e.target.name]: e.target.value });
  };
  const senddata = async (e) => {
    setloader(true)
    let formData = new FormData();
    formData.append('file',Filedata)
    await axios.post("http://localhost:8080/uploadimg", formData)
      .then((res) => {
        let data={...CarData, image: res.data}
        Addcar(data)
          .then((res) => {
            setloader(false)
           
            notifications.show({
              title: "Car Successfully Added",
              
              style: { color: "red" },
            });
          })
          .catch((err) => {
            setloader(false)
            notifications.show({
              title: "Try Again",
            });
          });
      })
      .catch((err) => {
        setloader(false)
        notifications.show({
          title: "Try again",
        });
      });
  };
  
  return (
    <Box m={"auto"} w={["100%", "50%", "25%"]}>
      <LoadingOverlay
        loaderProps={{ size: "sm", color: "pink", variant: "bars" }}
        overlayOpacity={0.3}
        overlayColor="#c5c5c5"
        visible={loader}
      />
      <Input.Wrapper>
        <Input.Wrapper id="Title" label="Car Name" required maw={320} mx="auto">
          <Input
            name="name"
            onChange={(e) => {
              handlechange(e);
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
              onChange={(e) => {
                handlechange(e);
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
              onChange={(e) => {
                handlechange(e);
              }}
              mask="15"
              type="number"
              id="Mileage"
              placeholder="15"
            />
          </Input.Wrapper>
          <Input.Wrapper
            id='color'
            label='color'
            required
            maw={320}
            mx="auto">
          <Input
          label='color'
          required
            name="color"
            onChange={(e) => {
              handlechange(e);
            }}
            mask="Red"
            id="color"
            placeholder="Red"
          /></Input.Wrapper>
          <Input.Wrapper
            id='description'
            label='description'
            required
            maw={320}
            mx="auto">
         </Input.Wrapper> <textarea
           style={{maxWidth:'100%',width:'100%',height:'100px'}}
            name="description"
            onChange={(e) => {
              handlechange(e);
            }}
            placeholder="description"
          />
          <FileInput
            required
            accept="image/png,image/jpeg"
            onChange={(e) => {
              setFiledata(e)
            }}
            label="Upload files"
            placeholder="Upload files"
          />
          <Button
            w={"100%"}
            onClick={(e) => {
              senddata(e);
            }}
            type="submit"
            color="red">
            Submit
          </Button>
        </Input.Wrapper>
      </Input.Wrapper>
    </Box>
  );
}
