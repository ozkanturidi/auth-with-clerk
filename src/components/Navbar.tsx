"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Box, Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Navbar = () => {
  const { user } = useUser();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const Links = [
    { name: "Home", href: "/", visible: true },
    {
      name: "Create Blog",
      href: "/blogs/create",
      visible: user ? true : false,
    },
    { name: "About", href: "/about", visible: true },
    { name: "Contact", href: "/contact", visible: true },
    { name: "Login", href: "/login", visible: user ? false : true },
    { name: "Profile", href: "/profile", visible: user ? true : false },
  ];

  return (
    <Box
      asChild
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "60px",
        top: visible ? "0" : "-60px",
        transition: "top 0.3s",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        position: "sticky",
        zIndex: 50,
      }}
    >
      <header>
        <ul>
          <Container size={"4"}>
            <Flex
              height={"9"}
              align={"center"}
              gap="7"
              justify={"end"}
              grow={"1"}
            >
              {Links.filter((link) => link?.visible === true).map(
                (link) =>
                  link && (
                    <Link
                      href={link.href}
                      key={link.name}
                      className={`${
                        pathname === link.href
                          ? "border-b-2 border-blue-600"
                          : ""
                      } hover:text-blue-600 transition-all duration-300 ease-in-out`}
                    >
                      {link.name}
                    </Link>
                  )
              )}
              <UserButton />
            </Flex>
          </Container>
        </ul>
      </header>
    </Box>
  );
};

export default Navbar;
