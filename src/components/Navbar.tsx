"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Box, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
const Navbar = () => {
  const { user, isLoaded } = useUser();
  console.log(user);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

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
      <nav>
        <ul>
          <Flex align={"center"} gap="7" justify={"end"} pt={"4"} pr={"6"}>
            <Link href="/blogs">Blogs</Link>
            {user && isLoaded && <Link href="/blogs/create">Create Blog</Link>}
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
            {!user && <Link href="/login">Login</Link>}
            <UserButton />
          </Flex>
        </ul>
      </nav>
    </Box>
  );
};

export default Navbar;
