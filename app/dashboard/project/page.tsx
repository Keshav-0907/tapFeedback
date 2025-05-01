'use client'
import AddProjectModal from '@/components/common/AddProjectModal';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { Button } from '@/components/ui/button'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Projects = () => {
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className='flex justify-end'>
                <Button className="cursor-pointer text-white" onClick={() => setShowAddProjectModal(true)}>
                    New Project
                </Button>
            </div>

            <div>
                {projects.length > 0 ? (
                    <div className='grid grid-cols-4'>
                        {projects.map((project: any) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-96">
                        <h1 className="text-2xl text-gray-500">No projects found</h1>
                    </div>
                )}
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