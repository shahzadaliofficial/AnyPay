'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'




const AuthForm = ({ type }: { type: string }) => {
  const formSchema=authFormSchema(type)
  const router = useRouter()
  const [user, setUser] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser();
      console.log("Logged in user:", loggedInUser);
      if(loggedInUser) router.push('/')
    };
    fetchUser();
  }, [user]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit= async(data: z.infer<typeof formSchema>)=> {
 
    setIsLoading(true)

    try{
      if (type === 'sign-up') {
        const newUser= await signUp(data);
        setUser(newUser)

        if(newUser) router.push('/sign-in')

        console.log("Signing up with values:", newUser);
      }
      if (type === 'sign-in') {
        const response=await signIn({
          email: data.email,
          password: data.password,
        })
        console.log("Signing in with values:", response);
        if(response) router.push('/')

      }
    } catch (error) {
      console.error("Error during form submission:", error)
      // Handle error appropriately, e.g., show a toast notification
    }finally{
      setIsLoading(false)
    }
  
}



  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/"
          className='flex cursor-pointer items -center gap-1'>
          <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt='Logo'
          />
          <h1 className='text-26 font-ibm-flex-serif font-bold text-black-1'>AnyPay</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900 '>
            {user
              ? 'Link account'
              : type === 'sign-up'
                ? 'Sign up'
                : 'Sign in'
            }
          </h1>
          <p className='text-16 font-normal text-gray-600'>
            {user
              ? 'Link your account to Get Started'
              : "Please Enter your details"
            }
          </p>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>
          {/*Plaid Link Component would go here*/}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                <div className='flex gap-4 '>
                  <CustomInput  control={form.control} name="firstName" label="First Name" placeholder="ex: John" />
                  <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="ex: Doe" />
                </div>
                  <CustomInput control={form.control} name="address" label="Address" placeholder="Enter your specific address" />
                  <CustomInput control={form.control} name="city" label="City" placeholder="Enter your city" />
                 <div className='flex gap-4'>
                 <CustomInput control={form.control} name="state" label="State" placeholder="ex: Punjab" />
                  <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="ex: 12345" />
                 </div>
                 <div className='flex gap-4'>
                  <CustomInput control={form.control} name="dob" label="Date of Birth" placeholder="ex: YYYY-MM-DD" />
                  <CustomInput control={form.control} name="cnic" label="CNIC" placeholder="ex: 1234512345671" />
                 </div>
                </>
              )}
              <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
              <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

              <Button type="submit" disabled={isLoading}
              className='form-btn w-full'>
                {isLoading? (
                  <>
                  <Loader2 size={20} className='animate-spin'/> &nbsp;
                  Loading...
                  </>
                ) : (
                  type === 'sign-up'
                   ? 'Sign Up': 'Sign In'
                )}
              </Button>
            </form>
          </Form>
          <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>
              {type==='sign-up' 
                ? 'Already have an account?'
                : "Don't have an account?"}
            </p>
            <Link href={type === 'sign-up' ? '/sign-in' : '/sign-up'} 
            className='form-link'>
              {type === 'sign-up' ? 'Sign In' : 'Sign Up'} 
            </Link>
            </footer>
        </>
      )
      }

    </section>

  )
}

export default AuthForm