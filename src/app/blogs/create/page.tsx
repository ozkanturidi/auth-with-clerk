"use client";
import {
  Box,
  Flex,
  TextArea,
  TextFieldInput,
  Text,
  Section,
  Button,
  Switch,
} from "@radix-ui/themes";

import { useFormState, useFormStatus } from "react-dom";
import createBlog from "@/lib/actions";
import SubmitButton from "@/components/SubmitButton";

const CreateBlog = () => {
  const [state, createBlogAction] = useFormState(createBlog, null);

  return (
    <main className="mx-4">
      <form action={createBlogAction}>
        <Section width={"100%"}>
          <Text>Create Your Blog</Text>
          <Flex direction={"column"} gap={"4"}>
            <TextFieldInput
              style={{ borderColor: "transparent" }}
              placeholder="Title"
              size="2"
              name="title"
              radius="medium"
              id="title"
              required
            />

            <TextArea
              rows={10}
              placeholder="Content"
              maxLength={400}
              name="content"
              required
            />
            <input type="file" name="image" id="file" accept="image/*" />
            <Text as="label" size="2">
              <Flex gap="2">
                <Switch defaultChecked value={"Turkish"} name="language" />{" "}
                Türkçe
              </Flex>
            </Text>
            <Flex justify={"end"}>
              <SubmitButton />
            </Flex>
          </Flex>
        </Section>
      </form>
    </main>
  );
};

export default CreateBlog;
