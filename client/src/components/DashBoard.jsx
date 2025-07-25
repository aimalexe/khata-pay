"use client";
import { useState, useEffect } from "react";
import AccountPng from "@/assets/images/account.png";
import Link from "next/link";

import {
  AppShell,
  Burger,
  Group,
  Text,
  UnstyledButton,
  Avatar,
  Menu,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconBell,
  IconChevronDown,
} from "@tabler/icons-react";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";

export default function Dashboard() {
  const [opened, { toggle }] = useDisclosure();
  const [activeSection, setActiveSection] = useState("dashboard");
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
    <AppShell
      header={{ height: 50 }}
      navbar={{ width: 280, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
      className="bg-white"
    >
  
      <AppShell.Header>
        <Group h="100%" px="xl" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <h2
            className="text-[#0a6b1f] font-semibold text-2xl"
            style={{ fontFamily: "Harabara" }}
          >
            Dashboard
          </h2>
          <Group>
            <IconBell size={20} className="text-green-700" />

            <Menu shadow="xl" width={200} position="bottom-end">
              <Menu.Target>
                <UnstyledButton className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-500 transition-colors">
                  <Avatar src={AccountPng.src} size={32} radius="xl" />
                  <div className="text-left hidden sm:block">
                    <Text size="sm" fw={500}>
                      {user?.name || "Guest"}
                    </Text>
                  </div>
                  <IconChevronDown size={16} className="text-green-900" />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>More</Menu.Label>

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
          </Group>
        </Group>
      </AppShell.Header>

    
      <AppShell.Navbar p="md" className="bg-white border-r border-gray-200">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </AppShell.Navbar>

      
      <AppShell.Main className="bg-white">
        <DashboardContent activeSection={activeSection} />
      </AppShell.Main>
    </AppShell>
  );
}
