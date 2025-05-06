'use client'
import AddProjectModal from '@/components/common/AddProjectModal';
import Loader from '@/components/common/Loader';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Projects = () => {
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth()

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/project/get-all', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setProjects(response.data.projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className='flex flex-col gap-4 px-2 py-4'>
            <div className='flex justify-end items-center'>
                <Button variant={'outline'} className="cursor-pointer" onClick={() => setShowAddProjectModal(true)}>
                    Create New Project
                </Button>
            </div>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col'>
                    <div className='font-semibold text-xl'>
                        Your Widgets
                    </div>
                    <div className='text-sm text-gray-500'>
                        Manage all your created widgets in one place. Edit, track responses, or create a new one in seconds.
                    </div>
                </div>
                <div>
                    {projects.length > 0 ? (
                        <div className='grid grid-cols-4 gap-4'>
                            {projects.map((project: any, index) => (
                                <ProjectCard key={index} project={project} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-96">
                            <h1 className="text-2xl text-gray-500">No projects found</h1>
                        </div>
                    )}
                </div>
            </div>

            {
                showAddProjectModal && (
                    <AddProjectModal setShowAddProjectModal={setShowAddProjectModal} />
                )
            }

        </div>
    )
}

export default Projects