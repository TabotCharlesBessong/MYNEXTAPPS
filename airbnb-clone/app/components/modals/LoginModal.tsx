
"use client";

import {signIn} from 'next-auth/react'
import React, { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import { Button, Heading, Input, Modal } from "../index";
import { toast } from "react-hot-toast";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    signIn('credentials',{
      ...data,
      redirect:false
    })
    .then((callback) => {
      setIsLoading(false)

      if(callback?.ok) {
        toast.success('Logged In')
        router.refresh()
        loginModal.onClose()
      }

      if(callback?.error) {
        toast.error(callback.error)
      }
    })
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome To AirBnB" subTitle="Sign into your account" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Conitue With Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Conitue With Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="text-center flex flex-row items-center gap-4 justify-center">
          <div>Already have an account</div>
          <div onClick={loginModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
            Log In
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
