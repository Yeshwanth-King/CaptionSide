'use client'

import * as React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Home, Settings, Menu, User, ChevronLeft } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { useSession } from 'next-auth/react'
import Link from 'next/link'




interface SidebarProps {
  username?: string
  fullName?: string
}

export default function Slidebar({ username = 'username', fullName = 'Full Name' }: SidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const option = searchParams.get('opt')
  const [selectedOption, setSelectedOption] = React.useState<string>('dashboard')
  const [userData, setUserData] = React.useState<{name: string, email: string}>()

  const { data: session } = useSession()

  React.useEffect(() => {
    if (option==='dashboard') {
      setSelectedOption('dashboard')
    } else if (option==='settings') {
      setSelectedOption('settings')
    }
  }, [option])

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/user/getUserDetails?email=${session.user.email}`)
          if (response.ok) {
            const data = await response.json()
            setUserData(data)
          }
        } catch (error) {
          console.error('Error fetching user details:', error)
        }
      }
    }

    fetchUserData()
  }, [session])

  const handleOptionClick = (option: string) => {
    if (option === 'dashboard') {
      router.push(`?opt=dashboard`)
    } else if (option === 'settings') {
      router.push(`?opt=settings`)
    }
  }

  const user = useSession().data?.user

  return (
    <SidebarProvider className='w-auto'>
      <Sidebar className="border-none ">
        <SidebarHeader className="flex flex-col items-center p-4">
          <Avatar className="h-20 w-20">
            { user?.image &&
            <AvatarImage src={user?.image} alt="Logo" />
              }
            <AvatarFallback className='bg-purple-600'>
              <User></User>
            </AvatarFallback>
          </Avatar>
          <div className="mt-4 text-center">
            <h1 className="text-xl font-medium tracking-widest">{userData?.name}</h1>
            <p className="text-xs text-purple-400">{userData?.email}</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleOptionClick('dashboard')}
                isActive={selectedOption === 'dashboard'}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleOptionClick('settings')}
                isActive={selectedOption === 'settings'}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/* You can add footer content here if needed */}
        </SidebarFooter>
      </Sidebar>
      <MobileSidebarTrigger />
    </SidebarProvider>
  )
}

function MobileSidebarTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed top-4 left-4 z-40 md:hidden bg-sidebar-primary border-none"
      onClick={toggleSidebar}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}