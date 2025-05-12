'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/common/Loader'

const Dashboard = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/dashboard/project')
    }, [])

    return <Loader/>
}

export default Dashboard
