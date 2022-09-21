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
  Highlight,
} from "@chakra-ui/react";
import NextLink from "next/link";
const defaultpic: string =
  "https://drive.google.com/uc?id=1_6Nlg2YJEROqakx47LjLzuLjhLifPJ5t";

export function ActivityCard({ props }: any) {
  return (
    <Center key={props.id} py={12}>
      <NextLink href={`/activities/${props.id}`}>
        <Link style={{ textDecoration: "none" }}>
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
                alt={props.name}
                boxShadow={"0px 10px 13px -7px #000000"}
              />
            </Box>
            <Stack pt={4} height={"75px"} align={"center"}>
              <Heading
                fontSize={"2xl"}
                fontFamily={"body"}
                fontWeight={600}
                textAlign={"center"}
              >
                {props.name}
              </Heading>
            </Stack>
            <Stack pb={3} direction={"row"} align={"center"}>
              <Text fontWeight={400} fontSize={"xl"} textAlign={"center"}>
                {props.city.name}
              </Text>
            </Stack>
            <Stack pb={3} direction={"row"} align={"center"}>
              <Text
                fontWeight={400}
                fontSize={"lg"}
                overflow={"hidden"}
                height={"120px"}
              >
                {props.description}
              </Text>
            </Stack>
            <Stack>
              <Text fontWeight={700} fontSize={"xl"}>
                $ {props.price}
              </Text>
            </Stack>
            {/* <NextLink href={`/activities/${props.id}`}>
          {' '}
          See more info of this trip{' '}
        </NextLink> */}
            <Button
              w={"full"}
              mt={8}
              bg={useColorModeValue("#151f21", "#f4f4f4")}
              color={useColorModeValue("#f4f4f4", "#151f21")}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              <Link href={`/activities/${props.id}`}>See more information</Link>
            </Button>
          </Box>
        </Link>
      </NextLink>
    </Center>
  );
}