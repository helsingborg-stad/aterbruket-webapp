/* eslint-disable prefer-object-spread */
/* eslint-disable no-console */
import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { createPage, updatePage, deletePage } from "../graphql/mutations";
import { getPage } from "../graphql/queries";
import { Page, GetPageQuery } from "../API";
import "draft-js/dist/Draft.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
  margin: 0 0 50px 0;
`;

const About: FC = () => {
  const [page, setPage] = useState<Page | undefined>(undefined);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchPageContent = async () => {
    try {
      const response = (await API.graphql(
        graphqlOperation(getPage, { slug: "about" })
      )) as GraphQLResult<GetPageQuery>;
      const pageData = response?.data?.getPage;

      setPage({
        ...pageData,
        __typename: "Page",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editClick = () => {
    console.log("edit click");
    setIsEditing(true);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    console.log("Submit click");

    try {
      const updatedPage = await API.graphql({
        query: updatePage,
        variables: {
          input: {
            id: page?.id,
            slug: page?.slug,
            title: page?.title,
            content: page?.content,
          },
        },
      });
      console.log("updatedPage", updatedPage);
    } catch (error) {
      console.log("Update page error: ", error);
    }

    setIsEditing(false);
  };

  const handleCange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    console.log("handleCange");

    const newPageState: Page = Object.assign({}, page, {
      [e.currentTarget.name]: e.currentTarget.value,
    });

    setPage(newPageState);
  };

  const handleCancelEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("handleCancelEdit");
    fetchPageContent();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <main>
        <Container>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">
              Titel
              <input
                onChange={handleCange}
                className="input"
                type="text"
                name="title"
                value={page?.title}
              />
            </label>

            <label htmlFor="title">
              Titel
              <textarea
                onChange={handleCange}
                className="input"
                name="content"
                value={page?.content || ""}
              />
            </label>

            <br />
            <br />
            <button type="submit">Spara</button>
            <br />
            <br />

            <button type="button" onClick={handleCancelEdit}>
              Avbryt
            </button>
          </form>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container>
        <button type="button" onClick={editClick}>
          Ändra
        </button>

        <h2>{page?.title}</h2>

        <article
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: page?.content || "",
          }}
        />
      </Container>
    </main>
  );
};

export default About;
