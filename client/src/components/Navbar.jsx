"use client";
import Link from "next/link";
import { Menu, UnstyledButton, Avatar, rem, Text } from "@mantine/core";
import AccountPng from "@/assets/images/account.png";
import { useState, useEffect } from "react";
import { IconLogout, IconUser, IconChevronDown } from "@tabler/icons-react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
        console.log(user);
      }
    } catch (e) {
      console.error("Failed to parse user JSON:", e);
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <header className="bg-white shadow-sm px-6 py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* navbar khatapay */}
        <Link
          href="/"
          className="text-[#0a6b1f] text-xl font-bold"
          style={{ fontFamily: "Harabara" }}
        >
          Khata Pay
        </Link>

        <Menu shadow="xl" width={200} position="bottom-end">
          <Menu.Target>
            <UnstyledButton className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-500 transition-colors">
              <Avatar src={AccountPng.src} size={32} radius="xl" />
              <div className="text-left hidden sm:block">
                <Text size="sm" fw={500}>
                  {user?.name || "Guest"}
                </Text>
              </div>
              <IconChevronDown size={16} className="text-gray-400" />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item
              leftSection={
                <IconUser style={{ width: rem(14), height: rem(14) }} />
              }
            >
              <Link href="/user-profile">Profile</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={
                <IconLogout style={{ width: rem(14), height: rem(14) }} />
              }
            >
              <Link href="/">Logout</Link>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
}
