import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogIn, PlusCircle } from 'lucide-react'

export function Login() {
  return (
    <Tabs
      defaultValue="sign-in"
      className="w-80 flex flex-col justify-center items-center mx-auto"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-in">Entrar</TabsTrigger>
        <TabsTrigger value="sign-up">Cadastrar</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in" className="flex flex-col gap-2 w-full">
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" />
        <Button>
          Entrar
          <LogIn />
        </Button>
      </TabsContent>
      <TabsContent value="sign-up" className="flex flex-col gap-2 w-full">
        <Input placeholder="Nome" />
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" />
        <Input placeholder="Confirmar senha" />
        <Button>
          Cadastrar
          <PlusCircle />
        </Button>
      </TabsContent>
    </Tabs>
  )
}
