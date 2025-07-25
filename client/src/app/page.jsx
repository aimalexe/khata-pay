"use client";
import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { loginUser } from "@/services/loginHandling.services.js";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import KhataPayIcon from '@/assets/images/khata-pay-icon.png'

import {
  TextInput,
  PasswordInput,
  Title,
  Container,
  Text,
  Stack,
  Paper,
  Checkbox,
} from "@mantine/core";
import { IconCheck, IconEye, IconEyeOff } from "@tabler/icons-react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const hasShown = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasShown.current) {
      notifications.show({
        title: "Welcome message",
        message: "Welcome to Khata Pay Login!",
        color: "green",
      
      });
      hasShown.current = true;
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "password must be atleast 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      setLoading(true);

      try {
        await loginUser(values,router);

        notifications.show({
          title: "Login Successful",
          message: "Redirecting to Your Dashboard",
          color: "green",
        });

        router.push("/user-dashboard");
      } catch (error) {
        setErrorMsg(error.message || "Login failed");
        notifications.show({
          title: "Login Failed",
          message: error.message || "Please try again.",
          color: "red",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-white ">
      <Container size={800} className="w-full">
        <div className="min-h-screen flex flex-col lg:flex-row lg:grid lg:grid-cols-2 gap-12 items-center justify-center">

          {/* Information side */}
          <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-start text-[#0a4a1f] space-y-1 h-full">
            <div className="space-y-2">
              <h2 className="text-4xl text-[#0a6b1f] text-justify "
              style={{fontFamily:"Harabara"}}>
                Let's pick up where you left off!
              </h2>
            </div>
            <p className="text-xl text-black leading-relaxed font-thin ">
              Ready to grow your business? Your digital ledger is waiting.
            </p>
          </div>

          {/* Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 flex items-center justify-center">
            <Paper
              radius="sm"
              p={40}
              className="shadow-2xl w-full"
              style={{
                backgroundColor: "white",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            >
              {/* logo and title */}
              <div className="text-center mb-3">
                <img src={KhataPayIcon.src} alt="Khata Pay Icon" className="w-10 h-10 mx-auto" />
                <Title order={2} className=" text-[#0a4a1f] font-semibold">
                  Log In
                </Title>
              </div>
              {errorMsg && (
                <Text
                  size="sm"
                  className="text-black text-center mb-4 p-3 rounded-lg border"
                >
                  {errorMsg}
                </Text>
              )}

              <form onSubmit={formik.handleSubmit}>
                <Stack gap="lg">
                  {/* Username */}
                  <div>
                    <Text size="xs" className="!text-[#0a4a1f] font-medium">
                      Username
                    </Text>
                    <div className="relative mt-2">
                      <TextInput
                        placeholder="Enter your username"
                        size="sm"
                        {...formik.getFieldProps("name")}
                        error={formik.touched.name && formik.errors.name}
                        styles={{
                          input: {
                            backgroundColor: "white",
                            borderColor: formik.values.name ? "black" : "black",
                            color: "black",
                            borderRadius: "10px",
                            height: "38px",
                            fontSize: "13px",
                          },
                          error: {
                            fontSize: "12px",
                          },
                        }}
                      />
                      {formik.values.name && !formik.errors.name && (
                        <IconCheck
                          size={18}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600"
                        />
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <Text size="xs" className="!text-[#0a4a1f] font-medium ">
                        Password
                      </Text>
                    </div>

                    <PasswordInput
                      placeholder="Enter your password"
                      size="md"
                      {...formik.getFieldProps("password")}
                      error={formik.touched.password && formik.errors.password}
                      visibilityToggleIcon={({ reveal }) =>
                        formik.values.password ? (
                          reveal ? (
                            <IconEye size={18} />
                          ) : (
                            <IconEyeOff size={18} />
                          )
                        ) : null
                      }
                      styles={{
                        input: {
                          backgroundColor: "white",
                          borderColor: formik.values.name ? "black" : "black",
                          color: "black",
                          borderRadius: "10px",
                          height: "38px",
                          fontSize: "13px",
                        },
                        error: {
                          fontSize: "12px",
                        },

                        visibilityToggle: {
                          color: "#00521b",
                          "&:hover": {
                            color: "#00521b",
                          },
                        },
                      }}
                    />
                  </div>

                  <div className="flex flex-row justify-between">
                    <div className="text-gray-500 hover:cursor-pointer">
                      <Checkbox
                        
                        label="Remember me"
                        color="#0a6b1f"
                        radius="xs"
                        size="xs"
                      />
                    </div>
                    <div>
                      <p className="text-[#0a4a1f] text-xs text-right hover:cursor-pointer underline">
                        Forgot password?
                      </p>
                    </div>
                  </div>

                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-white bg-[#0a6b1f] hover:bg-[#0a4a1f] hover:cursor-pointer rounded-[8px] text-[16px] font-bold"
                  >
                    {loading ? "Logging In..." : "Login"}
                  </button>
                </Stack>
              </form>

              
              <div className="text-center mt-3 space-y-2">
                <Text size="xs" className="text-black">
                  <span className="text-black">Don't have an account? </span>
                  <Link
                    className="text-[#0a4a1f] hover:text-[#244830] transition-colors font-semibold"
                    href="/signup"
                  >
                    Signup
                  </Link>
                </Text>
              </div>
            </Paper>
          </div>
        </div>
      </Container>
    </div>
  );
}
