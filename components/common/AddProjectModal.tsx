'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { X } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useAuth from '@/hooks/useAuth';
import { toast } from "sonner"
import axios from 'axios';

const AddProjectModal = ({ setShowAddProjectModal }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [projectTitle, setProjectTitle] = useState("");
    const [projectURL, setProjectURL] = useState("");
    const [isValidURL, setIsValidURL] = useState(true);
    const { user } = useAuth()


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowAddProjectModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowAddProjectModal]);

    const validateURL = (url: string): boolean => {
        try {
            new URL(url);
            setIsValidURL(true);
            return true;
        } catch (_) {
            setIsValidURL(false);
            return false;
        }
    };

    const handleProjectSubmit = async () => {
        if (!projectTitle || !projectURL) {
            toast.error('Please fill all the fields')
            return;
        }
        if (!validateURL(projectURL)) {
            setIsValidURL(false);
            toast.error('Please enter a valid URL')
            return;
        }

        const res = await axios.post('/api/project/create-new', {
            title: projectTitle,
            url: projectURL,
            userId: user?.id
        })

        if (res.status === 201) {
            toast.success('Project created successfully')
            setShowAddProjectModal(false);
            return;
        }

        toast.error('Project creation failed')
        return;
    }




    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
            <Card ref={modalRef} className="w-full max-w-md">
                <CardHeader className='flex justify-between items-center'>
                    <div>
                        Create New Project
                    </div>

                    <X size={16} />
                </CardHeader>

                <CardContent className='flex flex-col gap-4'>
                    <div>
                        <Label> Project Name </Label>
                        <Input type="text" placeholder="Project Name" className="mt-1" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
                    </div>

                    <div>
                        <Label> URL </Label>
                        <Input type="text" placeholder="Project URL" className="mt-1" value={projectURL} onChange={(e) => setProjectURL(e.target.value)} />
                        {!isValidURL && (
                            <p className='text-red-500 text-sm mt-1'>
                                Please enter a valid URL
                            </p>
                        )}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button onClick={handleProjectSubmit} className='cursor-pointer text-white'>
                        Create Project
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AddProjectModal