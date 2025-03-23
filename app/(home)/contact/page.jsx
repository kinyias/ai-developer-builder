'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 kí tự.' }),
  email: z.string().email({ message: 'Vui lòng nhập email hợp lệ.' }),
  message: z.string().min(10, { message: 'Yêu cầu phải có ít nhất 10 kí tự.' }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    mode: 'onChange', // Ensures validation triggers on input change
  });

  // Form submission handler
  async function onSubmit(values) {
    setIsSubmitting(true);
    setIsError(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(values);
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="h-full bg-background text-foreground flex flex-col">
      <main className="relative flex-1 flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full z-10">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
            Liên hệ
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Có vấn đề gì xảy ra với bạn. Liên hệ với chúng tôi qua
          </p>

          {isSuccess ? (
            <Alert className="mb-8 bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400 border-green-500/20">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Thành công!</AlertTitle>
              <AlertDescription>
                Yêu cầu của bạn đã được gửi thành công.
              </AlertDescription>
              <div className="mt-4">
                <Button
                  onClick={() => {
                    setIsSuccess(false);
                    setIsError(false);
                  }}
                >
                  Gửi yêu cầu khác
                </Button>
              </div>
            </Alert>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Liên hệ với chúng tôi</CardTitle>
                <CardDescription>
                  Vui lòng điền đầy đủ thông tin bên dưới và chúng tôi sẽ trả lời sớm nhất có thể qua email của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Lỗi</AlertTitle>
                    <AlertDescription>
                      Có vấn đề với yêu cầu của bạn.
                    </AlertDescription>
                  </Alert>
                )}

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên</FormLabel>
                          <FormControl>
                            <Input placeholder="Tên của bạn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yêu cầu</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tôi có thể giúp được gì cho bạn?"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        'Gửi yêu cầu'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Chúng tôi sẽ không chia sẻ thông tin cá nhân của bạn.
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
