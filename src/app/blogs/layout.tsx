import { Container } from "@radix-ui/themes";

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Container size={"4"}>{children}</Container>
    </>
  );
}
