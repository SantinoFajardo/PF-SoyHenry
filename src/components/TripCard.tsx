import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Link,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
const defaultpic: string =
  "https://drive.google.com/uc?id=1YZhzZFB0nRQuLLzmFVq13upFeZQo5CLd";

export function TripCard({ props }: any) {
  return (
    <Center key={props.id} py={12}>
      <NextLink href={`/trips/${props.id}`}>
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
            height={"300px"}
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
              rounded={"lg"}
              height={260}
              width={282}
              objectFit={"cover"}
              src={props.image ? props.image : defaultpic}
              boxShadow={"0px 10px 13px -7px #000000"}
              alt='image card Trip'
            />
          </Box>
          <Stack marginTop={"0px"} height={"80px"} align={"center"}>
            <Heading
              fontSize={"2xl"}
              fontFamily={"body"}
              fontWeight={600}
              textAlign={"center"}
            >
              {props.name}
            </Heading>
          </Stack>
          <VStack direction={"row"} align={"center"}>
            <Text fontWeight={400} fontSize={"xl"}>
              Duration:
            </Text>
            <Text fontWeight={400} fontSize={"xl"}>
              From {props.initDate.slice(0, 10)}
            </Text>
            <Text fontWeight={400} fontSize={"xl"}>
              To {props.endDate.slice(0, 10)}
            </Text>
          </VStack>
          {/* <Text fontWeight={800} fontSize={"xl"}>
              N of Travelers: {props.tripOnUser.length}
            </Text>
            <Text fontWeight={800} fontSize={"xl"}>
              Activities: {props.activities.map((a: any) => a.name)}
            </Text> */}

          <Stack>
            <Text
              marginTop={"10px"}
              textAlign={"center"}
              fontWeight={700}
              fontSize={"xl"}
            >
              $ {props.price}
            </Text>
          </Stack>
          <Stack
            marginTop={"10px"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            <Link href={`/trips/${props.id}`}>See more info of this trip</Link>
          </Stack>
          <Button
            w={"full"}
            mt={5}
            bg={useColorModeValue("#151f21", "#f4f4f4")}
            color={useColorModeValue("#f4f4f4", "#151f21")}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <Link href={`/pasarella`}> Join the Trip! </Link>
          </Button>
        </Box>
      </NextLink>
    </Center>
  );
}