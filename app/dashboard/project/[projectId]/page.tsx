'use client';

import Appearance from '@/components/dashboard/Appearance';
import GetStarted from '@/components/dashboard/GetStarted';
import Settings from '@/components/dashboard/Settings';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import { Popup } from '@/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Project = () => {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({});
  const [activeTab, setActiveTab] = useState('get-started');
  const [popUp, setPopup] = useState<Popup | undefined>();

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `/api/project/get-project`,
          { projectId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        if (response.status === 200) {
          setProject(response.data.project);
          setPopup(response.data.popup[0]);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  if (!popUp) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Card className='w-1/2 p-6'>
          <div className='text-center text-lg font-semibold'>No Popups Found</div>
          <p className='text-muted-foreground'>Please create a popup to get started.</p>
        </Card>
      </div>
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      alert('Copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const embedCode = `
useEffect(() => {
  const script = document.createElement("script");
  script.src = "http://localhost:3000/embed/${popUp.id}";
  script.async = true;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);
  `;

  const renderTab = () => {
    switch (activeTab) {
      case 'get-started':
        return <GetStarted embedCode={embedCode} />
      case 'appearance':
        return <Appearance popupId={popUp.id}/>
      case 'settings':
        return <Settings />
      default:
        return null;
    }
  }

  return (
    <div className=''>
      <div className="flex items-center gap-8 border-b border-border px-4 pt-2">
        {[
          { label: "Get Started", value: "get-started" },
          { label: "Design", value: "appearance" },
          { label: "Settings", value: "settings" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`relative pb-1 text-sm font-medium transition-all cursor-pointer focus:outline-none ${activeTab === tab.value
              ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary"
              : "text-muted-foreground hover:text-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>



      <div>
        {renderTab()}
      </div>
    </div>
  );
};

export default Project;
