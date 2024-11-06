import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from '@clerk/clerk-react'
import { BicepsFlexed, LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const { userId } = useAuth()
  const navigate = useNavigate()

  if (userId) {
    navigate('/')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-80 text-center">
        <CardHeader className="items-center">
          <CardTitle>
            <BicepsFlexed className="text-primary size-10" strokeWidth={1} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignedOut>
            <SignInButton>
              <Button>
                Entrar com Google
                <LogIn className="size-4" />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </CardContent>
      </Card>
    </div>
  )
}
