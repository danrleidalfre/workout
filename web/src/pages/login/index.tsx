import { authenticateUser } from '@/api/authenticate-user'
import { createUser } from '@/api/create-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { BicepsFlexed, LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirm: z.string().optional(),
})

export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>

export function Login() {
  const { toast } = useToast()
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register: registerSignIn,
    handleSubmit: handleSignIn,
    reset: resetSignIn,
    formState: { isSubmitting: isLoadingSignIn },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const {
    register: registerSignUp,
    handleSubmit: handleSignUp,
    reset: resetSignUp,
    formState: { isSubmitting: isLoadingSignUp },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const signIn = async ({ email, password }: SignInSchema) => {
    try {
      const token = await authenticateUser({ email, password })

      login(token)

      resetSignIn({
        email: '',
        password: '',
      })

      resetSignUp({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      })

      navigate('/')
    } catch (error) {
      toast({
        title: 'Atenção',
        description:
          'Não foi possível entrar, verifique as credenciais ou tente novamente',
        variant: 'destructive',
      })
    }
  }

  const signUp = async ({
    name,
    email,
    password,
    passwordConfirm,
  }: SignUpSchema) => {
    if (password !== passwordConfirm) {
      toast({
        title: 'Atenção',
        description: 'Senhas precisam ser iguais',
        variant: 'destructive',
      })
      return
    }

    try {
      await createUser({ name, email, password })
      await signIn({ email, password })
    } catch (error) {
      toast({
        title: 'Atenção',
        description: 'Não foi possível cadastrar, tente novamente',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <BicepsFlexed className="size-20 text-primary" strokeWidth={1} />
      <Tabs defaultValue="sign-in" className="w-80">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Cadastrar</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <form
            onSubmit={handleSignIn(signIn)}
            className="flex flex-col gap-2 w-full"
          >
            <Input placeholder="E-mail" required {...registerSignIn('email')} />
            <Input
              placeholder="Senha"
              required
              type="password"
              {...registerSignIn('password')}
            />
            <Button type="submit">
              {isLoadingSignIn ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="sign-up" className="flex flex-col gap-2 w-full">
          <form
            onSubmit={handleSignUp(signUp)}
            className="flex flex-col gap-2 w-full"
          >
            <Input placeholder="Nome" required {...registerSignUp('name')} />
            <Input placeholder="E-mail" required {...registerSignUp('email')} />
            <Input
              placeholder="Senha"
              required
              type="password"
              {...registerSignUp('password')}
            />
            <Input
              placeholder="Confirme a senha"
              required
              type="password"
              {...registerSignUp('passwordConfirm')}
            />
            <Button type="submit">
              {isLoadingSignUp ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
