/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Trip, Activity } from "src/utils/interface";
import {
  Box,
  Heading,
  Image,
  Text,
  Center,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { settings } from "src/utils/SettingsCarousel";

interface Props {
  trips: Trip[];
  activities: Activity[];
}

const MyCarousel = ({ trips, activities }: Props) => {
  const defaultpic: string =
    "https://res.cloudinary.com/mauro4202214/image/upload/v1663331567/world-travelers/defaultimagetrip_j90ewc.png";

  const lastTrips = trips?.reverse().slice(0, 13);
  const lastActivities = activities?.reverse().slice(0, 13);

  const useColorMode = useColorModeValue("white", "gray.800");

  const upPrice = (price: number) => {
    return Math.floor(price + (price * 30) / 100);
  };

  return (
    <>
      <Box p={5} mt={"20px"}>
        <Heading textAlign={"center"}>Trending Trips</Heading>
      </Box>
      <Box width={"100%"} justifyContent={"center"} alignContent={"center"}>
        <Stack width={"80%"}>
          <Slider {...settings}>
            {lastTrips?.map((t) => {
              return (
                <Center p={8} py={12} key={t.id}>
                  <Box
                    role={"group"}
                    p={6}
                    maxW={"330px"}
                    w={"full"}
                    bg={useColorModeValue("white", "#4b647c")}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={1}
                  >
                    <Box
                      rounded={"lg"}
                      mt={-12}
                      pos={"relative"}
                      height={"230px"}
                      _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        filter: "blur(15px)",
                        zIndex: -1,
                      }}
                      _groupHover={{
                        _after: {
                          filter: "blur(20px)",
                        },
                      }}
                    >
                      <Image
                        alt="image"
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={t.image ? t.image.toString() : defaultpic}
                      />
                    </Box>
                    <Stack pt={10} align={"center"}>
                      <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                      >
                        {t.name}
                      </Heading>
                      <Stack direction={"row"} align={"center"}>
                        <Text fontWeight={800} fontSize={"xl"}>
                          {`$${t.price}`}
                        </Text>
                        <Text
                          textDecoration={"line-through"}
                          color={"gray.600"}
                        >
                          {`$${upPrice(t.price)}`}
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Center>
              );
            })}
          </Slider>
        </Stack>
      </Box>
      <Box p={5} mt={"20px"}>
        <Heading textAlign={"center"}>Trending Activities</Heading>
      </Box>
      <Box width={"100%"} justifyContent={"center"} alignContent={"center"}>
        <Stack width={"80%"}>
          <Slider {...settings}>
            {lastActivities?.map((a) => {
              return (
                <Center p={8} py={12} key={a.id}>
                  <Box
                    role={"group"}
                    p={6}
                    maxW={"330px"}
                    w={"full"}
                    bg={useColorModeValue("white", "#4b647c")}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={1}
                  >
                    <Box
                      rounded={"lg"}
                      mt={-12}
                      pos={"relative"}
                      height={"230px"}
                      _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        filter: "blur(15px)",
                        zIndex: -1,
                      }}
                      _groupHover={{
                        _after: {
                          filter: "blur(20px)",
                        },
                      }}
                    >
                      <Image
                        alt="image"
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={a.image ? a.image.toString() : defaultpic}
                      />
                    </Box>
                    <Stack pt={10} align={"center"}>
                      <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                      >
                        {a.name}
                      </Heading>
                      <Stack direction={"row"} align={"center"}>
                        <Text fontWeight={800} fontSize={"xl"}>
                          {`$${a.price}`}
                        </Text>
                        <Text
                          textDecoration={"line-through"}
                          color={"gray.600"}
                        >
                          {`$${upPrice(a.price)}`}
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Center>
              );
            })}
          </Slider>
        </Stack>
      </Box>
    </>
  );
};

export default MyCarousel;