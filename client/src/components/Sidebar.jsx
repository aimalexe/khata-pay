"use client";
import { Stack, NavLink, Text, Divider } from "@mantine/core";

import {
  IconWallet,
  IconChartBar,
  IconUsers,
  IconSettings,
  IconHelp,
  IconUserCircle,
} from "@tabler/icons-react";

const navigationItems = [
  { id: "customers", label: "Customers", icon: IconUsers },
  { id: "Transaction", label: "Transactions History", icon: IconWallet },
  { id: "analytics", label: "Analytics", icon: IconChartBar },
  { id: "profile", label: "Profile", icon: IconUserCircle },
];

const secondaryItems = [
  { id: "settings", label: "Settings", icon: IconSettings },
  { id: "help", label: "Help & Support", icon: IconHelp },
];

export default function Sidebar({ activeSection, setActiveSection }) {
  return (
    <Stack gap="xs" className="h-full">
      <div className="flex-1">
        <h3 className="text-[#0a6b1f] font-semibold text-sm"> Menu</h3>

        <Stack gap={1}>
          {navigationItems.map((item) => (
            <NavLink
              key={item.id}
              active={activeSection === item.id}
              label={item.label}
              leftSection={<item.icon size="1rem" />}
              onClick={() => {
                setActiveSection(item.id);
              }}
              className="rounded-md transition-all duration-200"
              styles={{
                root: {
                  backgroundColor:
                    activeSection === item.id ? "#d9f8e3" : undefined,
                  color: activeSection === item.id ? "#0a6b1f" : "#000",
                  fontWeight: activeSection === item.id ? 400 : 400,
                  borderRadius: "8px",
                  transition: "background 0.1s",
                  cursor: "pointer",
                },
                label: {
                  color: activeSection === item.id ? "#0a6b1f" : undefined,
                  fontSize: "12px",
                },
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.backgroundColor = "#e6f4ec";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            />
          ))}
        </Stack>
      </div>

      <div>
        <Divider my="md" />
        <Stack gap={2}>
          {secondaryItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <NavLink
                key={item.id}
                active={isActive}
                label={item.label}
                leftSection={<item.icon size="1.2rem" />}
                onClick={() => setActiveSection(item.id)}
                className="rounded-lg transition-all duration-200"
                styles={{
                  root: {
                    backgroundColor: isActive ? "#d9f8e3" : "transparent",
                    color: isActive ? "#0a6b1f" : "#000",
                    fontWeight: isActive ? 400 : 400,

                    borderRadius: "8px",
                    transition: "background 0.2s ease, color 0.2s ease",
                    cursor: "pointer",
                  },
                  label: {
                    color: isActive ? "0a6b1f" : undefined,
                    fontSize: "12px",
                  },
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              />
            );
          })}
        </Stack>
      </div>
    </Stack>
  );
}
