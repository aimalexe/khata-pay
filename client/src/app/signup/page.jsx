"use client";
import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { signupUser } from "@/services/signupHandling.services.js";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import KhataPayIcon from '@/assets/images/khata-pay-icon.png'
import {
  TextInput,
  PasswordInput,
  Title,
  Container,
  Text,
  Stack,
  Paper,
} from "@mantine/core";
import { IconCheck, IconEye, IconEyeOff } from "@tabler/icons-react";

export default function Login({ onBack }) {
  const [loading, setLoading] = useState(false);
  const hasShown = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasShown.current) {
      notifications.show({
        title: "Welcome message",
        message: "Welcome to Khata Pay Signup!",
        color: "green",
      });
      hasShown.current = true;
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      phone_number: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "password must be atleast 6 characters")
        .required("Password is required"),
      phone_number: Yup.string()
        .min(11, "Phone number must not be less than 11 digits")
        .required("Phone Number is required"),
    }),

    onSubmit: async (values) => {
      setLoading(true);

      try {
        await signupUser(values);

        notifications.show({
          title: "Signup Successful",
          message: "Redirecting to Your Dashboard",
          color: "green",
        });

        router.push("/user-dashboard");
      } catch (error) {
        setErrorMsg(error.message || "Signup failed");
        notifications.show({
          title: "Signup Failed",
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

          {/* Signup information */}
          <div className="hidden lg:flex flex-col justify-center items-start text-[#0a4a1f] space-y-8 h-full px-8">
            <div className="space-y-2">
              <h1
                className="text-4xl  text-[#0a6b1f] "
                style={{ fontFamily: "Harabara" }}
              >
                Start your journey with Khata Pay
              </h1>
              <p className="text-sm text-black leading-relaxed">
                Create your account to track credit, manage customers, and
                simplify your business finances — all in one place.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-[#076a25] rounded-full flex items-center justify-center mt-1">
                  <IconCheck size={15} className="text-white" />
                </div>

                <div>
                  <h3 className="font-semibold text-sm">
                    Trusted by 10,000+ Businesses
                  </h3>
                  <p className="text-black text-xs">
                    Helps small shop owners manage credits.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-[#076a25] rounded-full flex items-center justify-center mt-1">
                  <IconCheck size={15} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    Get Started in 2 Minutes
                  </h3>
                  <p className="text-black text-xs">
                    Simple signup and intuitive interface to begin.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-[#076a25] rounded-full flex items-center justify-center mt-1">
                  <IconCheck size={15} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    100% Private and Secure
                  </h3>
                  <p className="text-black text-xs">
                    Your data is encrypted and secured.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* signup Form */}
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
                <Title
                  order={2}
                  className=" text-[#0a4a1f] font-semibold text-xs"
                >
                  Sign up
                </Title>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <Stack gap="lg">
                  
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
                            "&:focus": {
                              borderColor: "white",
                              boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.3)",
                            },
                            "&::placeholder": {
                              color: "black",
                            },
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

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Text size="xs" className="!text-[#0a4a1f] font-medium">
                        Phone Number
                      </Text>
                    </div>
                    <TextInput
                      placeholder="Enter your phone number"
                      size="sm"
                      {...formik.getFieldProps("phone_number")}
                      error={
                        formik.touched.phone_number &&
                        formik.errors.phone_number
                      }
                      styles={{
                        input: {
                          backgroundColor: "white",
                          borderColor: formik.values.phone_number
                            ? "black"
                            : "black",
                          color: "black",
                          borderRadius: "10px",
                          height: "38px",
                          fontSize: "13px",
                          "&:focus": {
                            borderColor: "#00521b",
                            boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.3)",
                          },
                          "&::placeholder": {
                            color: "#6b7280",
                          },
                        },
                        error: {
                          fontSize: "12px",
                        },
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Text size="xs" className="!text-[#0a4a1f] font-medium">
                        Password
                      </Text>
                    </div>
                    <PasswordInput
                      placeholder="Enter your password"
                      size="md"
                      {...formik.getFieldProps("password")}
                      visibilityToggleIcon={({ reveal }) =>
                        formik.values.password ? (
                          reveal ? (
                            <IconEyeOff size={18} />
                          ) : (
                            <IconEye size={18} />
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
                          "&:focus": {
                            borderColor: "#00521b",
                            boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.3)",
                          },
                          "&::placeholder": {
                            color: "#6b7280",
                          },
                        },
                        innerInput: {
                          backgroundColor: "transparent",
                          color: "black",
                        },
                        visibilityToggle: {
                          color: "#00521b",
                          "&:hover": {
                            color: "#00521b",
                          },
                        },
                        error: {
                          fontSize: "12px",
                        },
                      }}
                      error={formik.touched.password && formik.errors.password}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-white bg-[#0a6b1f]  hover:bg-[#0a4a1f] hover:cursor-pointer rounded-[8px] text-[16px] font-bold"
                  >
                    {loading ? "Signing up.." : "Signup"}
                  </button>
                </Stack>
              </form>

              <div className="text-center mt-3 space-y-2">
                <Text size="xs" className="text-black">
                  <span className="text-black">Already have an account? </span>
                  <Link
                    className="text-[#0a4a1f] hover:text-[#244830] transition-colors font-semibold"
                    href="/"
                  >
                    Login
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
