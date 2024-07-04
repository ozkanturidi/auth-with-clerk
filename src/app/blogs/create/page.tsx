"use client";
import {
  Flex,
  Select,
  Switch,
  Text,
  TextArea,
  TextFieldInput,
} from "@radix-ui/themes";

import SubmitButton from "@/components/SubmitButton";
import createBlog from "@/lib/actions";
import { useFormState } from "react-dom";

const CreateBlog = () => {
  const [state, createBlogAction] = useFormState(createBlog, null);

  return (
    <main className="mx-4 mt-6">
      <form action={createBlogAction}>
        <Flex direction={"column"} gap={"4"}>
          <Text>Create Your Blog</Text>
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
          <Flex direction={"row"} justify={"between"}>
            <Flex direction={"column"} gap={"2"}>
              <input type="file" name="image" id="file" accept="image/*" />
              <Text as="label" size="2">
                <Flex gap="2">
                  <Switch defaultChecked value={"Turkish"} name="language" />{" "}
                  Turkish
                </Flex>
              </Text>
            </Flex>
            <Select.Root name="tag">
              <Select.Trigger placeholder="Pick a tag" name="tag" />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Mobile Development</Select.Label>
                  <Select.Item value="IOS">IOS</Select.Item>
                  <Select.Item value="Flutter">Flutter</Select.Item>
                  <Select.Item value="Kotlin">Kotlin</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group>
                  <Select.Label>Frontend Development</Select.Label>
                  <Select.Item value="React">React</Select.Item>
                  <Select.Item value="Vue">Vue</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <SubmitButton />
          </Flex>
        </Flex>
      </form>
    </main>
  );
};

export default CreateBlog;
