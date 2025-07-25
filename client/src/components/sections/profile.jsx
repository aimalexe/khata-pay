"use client";
import { useEffect, useState } from "react";
import { Card, Text, Group, Avatar, Stack, Badge } from "@mantine/core";
import { IconUser, IconPhone, IconCalendar } from "@tabler/icons-react";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log(parsedUser);
      }
    } catch (err) {
      console.error("Failed to parse user JSON:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a6b1f] mx-auto mb-4"></div>
          <Text size="lg" className="text-gray-600">
            Loading user profile...
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=" p-2 shadow-green-100 shadow-xs flex items-center justify-center">
        <Card className="p-10  max-w-6xl w-full bg-white">
          <div className="flex flex-col md:flex-row md:gap-12 gap-10 items-center justify-center">
            {/* profile photo */}
            <div className="flex flex-col items-center md:w-1/3">
              <Avatar
                size={150}
                className="border-4 border-[#0a6b1f] shadow-lg"
                style={{ backgroundColor: "#0a6b1f" }}
              >
                <IconUser size={60} className="text-white" />
              </Avatar>
              <Badge
                color="green"
                variant="light"
                size="sm"
                className="mt-4 bg-[#0a6b1f]/10 text-[#0a6b1f] border-[#0a6b1f]/20"
              >
                Active User
              </Badge>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-64 bg-green-300"></div>

            {/* User Details*/}
            <div className="flex-1 w-full space-y-3">
              <Stack gap="lg">
                
                <Group gap="md">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0a6b1f]/10">
                    <IconUser size={22} className="text-[#0a6b1f]" />
                  </div>
                  <div>
                    <Text size="xs" fw={500} className="text-gray-700">
                      Full Name
                    </Text>
                    <Text size="xs" className="text-gray-900">
                      {user.name}
                    </Text>
                  </div>
                </Group>

                <Group gap="md">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0a6b1f]/10">
                    <IconPhone size={20} className="text-[#0a6b1f]" />
                  </div>
                  <div>
                    <Text size="xs" fw={500} className="text-gray-700">
                      Phone Number
                    </Text>
                    <Text size="xs" className="text-gray-900">
                      {user.phone_number}
                    </Text>
                  </div>
                </Group>

                <Group gap="md">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0a6b1f]/10">
                    <IconCalendar size={20} className="text-[#0a6b1f]" />
                  </div>
                  <div>
                    <Text size="xs" fw={500} className="text-gray-700">
                      Member Since
                    </Text>
                    <Text size="xs" className="text-gray-900">
                      {formatDate(user.createdAt)}
                    </Text>
                  </div>
                </Group>
              </Stack>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
