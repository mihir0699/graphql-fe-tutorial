import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ApolloProvider, useQuery, gql, useLazyQuery } from "@apollo/client";

import {
  Input,
  Container,
  Heading,
  FormControl,
  Button,
  Text,
  Stack,
  HStack,
  Tag,
  FormLabel,
  Box,
  SkeletonCircle,
  SkeletonText,
  Image,
} from "@chakra-ui/react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState(null);
  const SEARCH_MOVIE = gql`
    query Movies($title: String!) {
      movie(title: $title) {
        Title
        Year
        Released
        Genre
        Director
        Actors
        Plot
        Poster
      }
    }
  `;

  const [getMovie, { loading, error, data }] = useLazyQuery(SEARCH_MOVIE);

  return (
    <Container>
      <Heading>Search for a movie</Heading>
      <br />
      <FormControl>
        <FormLabel htmlFor="movie">Movie title</FormLabel>
        <Input
          id="movie"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          onClick={() => getMovie({ variables: { title } })}
        >
          Submit
        </Button>
      </FormControl>
      {loading && (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      )}
      {data && data.movie && (
        <div>
          <Stack spacing={3}>
            <Text fontSize="2xl">MovieName - {data?.movie.Title}</Text>
            <Text>Year Released - {data?.movie.Released}</Text>
            <Text>Genre - {data?.movie.Genre} </Text>
            <Text>
              Actors -
              <HStack spacing={4}>
                {data?.movie?.Actors?.split(",").map((actor) => (
                  <Tag size={"sm"} variant="solid" colorScheme="teal">
                    {actor}
                  </Tag>
                ))}
              </HStack>{" "}
            </Text>

            <Text> Director - {data?.movie.Director}</Text>
            <Text> Plot - {data?.movie.Plot}</Text>
            <Image boxSize="200px" src={data?.movie.Poster} alt="Dan Abramov" />
          </Stack>
        </div>
      )}
    </Container>
  );
}
